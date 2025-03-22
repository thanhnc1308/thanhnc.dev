'use server';

import guestModel from '@/db/models/guest.model';
import dbConnect from '@/db/mongodb';
import {
  Guest,
  GuestListPaginationResponse,
  GuestConfirmationStatus,
  GuestSource,
} from '@/types/guest';
import { PaginationRequest } from '@/types/pagination';
import { hash } from '@/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _buildFilter = (query: string) => {
  return {};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _buildSort = (sort: string) => {
  return {};
};

const paginateGuestList = async ({
  query,
  currentPage = 1,
  rowsPerPage = 10,
}: PaginationRequest): Promise<GuestListPaginationResponse> => {
  try {
    await dbConnect();

    const filter = _buildFilter(query);
    const sort = _buildSort(query);
    const skip = (currentPage - 1) * rowsPerPage;
    const fetchGuestsPromise = guestModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(rowsPerPage)
      .exec();
    const countTotalGuestPromise = guestModel.countDocuments(filter).exec();

    const [guests, total] = await Promise.all([
      fetchGuestsPromise,
      countTotalGuestPromise,
    ]);

    return {
      total,
      data: guests,
    };
  } catch (error) {
    console.error('paginateGuestList', error);
    return {
      total: 0,
      data: [],
    };
  }
};

const fetchGuestById = async (guestId: string): Promise<Guest | null> => {
  const _guest = await guestModel.findById(guestId).exec();

  if (!_guest) {
    return null;
  }

  return _guest;
};

export type GuestState = {
  errors?: {
    name?: string[];
    memberCount?: string[];
    status?: string[];
    invited?: string[];
    guestSource?: string[];
  };
  message?: string | null;
};

const GuestSchema = z.object({
  _id: z.string(),
  name: z.string({
    invalid_type_error: 'Name must be a string.',
    required_error: 'Name is required.',
  }),
  memberCount: z.coerce.number({
    invalid_type_error: 'Member Count must be a number.',
    required_error: 'Member Count is required.',
  }),
  status: z.enum([
    GuestConfirmationStatus.Accepted,
    GuestConfirmationStatus.Pending,
    GuestConfirmationStatus.Declined,
  ]),
  invited: z.boolean(),
  guestSource: z.enum([GuestSource.Groom, GuestSource.Bride]),
});
const CreateGuestSchema = GuestSchema.omit({ _id: true });
const UpdateGuestSchema = GuestSchema.omit({ _id: true });

const listPagePath = '/admin/guest-list';

const generateGuestId = (guest: Guest) => {
  return hash(`${guest.guestSource}-${guest.name}`);
};

const createGuest = async (prevState: GuestState, formData: FormData) => {
  const validatedFields = CreateGuestSchema.safeParse({
    name: formData.get('name'),
    memberCount: formData.get('memberCount'),
    status: formData.get('status'),
    invited: !!formData.get('invited'),
    guestSource: formData.get('guestSource'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Guest.',
    };
  }

  try {
    await dbConnect();
    await guestModel.create({
      _id: generateGuestId(validatedFields.data as Guest),
      ...validatedFields.data,
    });
  } catch (e) {
    console.error('createGuest', e);
    return {
      message: 'Internal Server Error. Failed to Create Guest.',
    };
  }

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

const updateGuestById = async (
  guestId: string,
  prevState: GuestState,
  formData: FormData,
) => {
  const validatedFields = UpdateGuestSchema.safeParse({
    name: formData.get('name'),
    memberCount: formData.get('memberCount'),
    status: formData.get('status'),
    invited: !!formData.get('invited'),
    guestSource: formData.get('guestSource'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Guest.',
    };
  }

  try {
    await dbConnect();
    await guestModel.findByIdAndUpdate(guestId, validatedFields.data);
  } catch (e) {
    console.error('updateGuestById', e);
    return {
      message: 'Internal Server Error. Failed to Update Guest.',
    };
  }

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

const deleteGuestById = async (guestId: string | null) => {
  if (!guestId) {
    return;
  }

  try {
    await dbConnect();
    await guestModel.findByIdAndDelete(guestId);
  } catch (e) {
    console.error('updateGuestById', e);
    return {
      message: 'Internal Server Error. Failed to Update Guest.',
    };
  }

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

export {
  paginateGuestList,
  fetchGuestById,
  createGuest,
  updateGuestById,
  deleteGuestById,
};
