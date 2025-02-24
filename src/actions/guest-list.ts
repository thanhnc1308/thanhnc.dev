'use server';

import { Guest, GuestListPaginationResponse, GuestStatus } from '@/types/guest';
import { PaginationRequest } from '@/types/pagination';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const paginateGuestList = async ({
  query,
  currentPage,
}: PaginationRequest): Promise<GuestListPaginationResponse> => {
  try {
    console.log('query', query, currentPage);

    // mock
    const data = [
      {
        id: '1',
        name: 'John Doe',
        status: GuestStatus.Accepted,
        memberCount: 2,
      },
      {
        id: '2',
        name: 'Jane Doe',
        status: GuestStatus.Pending,
        memberCount: 3,
      },
      {
        id: '3',
        name: 'John Smith',
        status: GuestStatus.Declined,
        memberCount: 1,
      },
    ];

    return {
      totalPages: 100,
      data,
    };
  } catch (error) {
    console.error('paginateGuestList', error);
    return {
      totalPages: 0,
      data: [],
    };
  }
};

const fetchGuestById = async (guestId: string): Promise<Guest> => {
  return {
    id: guestId,
    name: 'John Smith',
    status: GuestStatus.Declined,
    memberCount: 1,
  };
};

export type GuestState = {
  errors?: {
    name?: string[];
    memberCount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const GuestSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Name must be a string.',
    required_error: 'Name is required.',
  }),
  memberCount: z.coerce.number({
    invalid_type_error: 'Member Count must be a number.',
    required_error: 'Member Count is required.',
  }),
  status: z.enum([
    GuestStatus.Accepted,
    GuestStatus.Pending,
    GuestStatus.Declined,
  ]),
});
const CreateGuestSchema = GuestSchema.omit({ id: true });
const UpdateGuestSchema = GuestSchema.omit({ id: true });

const listPagePath = '/admin/guest-list';

const createGuest = async (prevState: GuestState, formData: FormData) => {
  const validatedFields = CreateGuestSchema.safeParse({
    name: formData.get('name'),
    memberCount: formData.get('memberCount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Guest.',
    };
  }

  try {
    console.log(validatedFields.data);
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
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Guest.',
    };
  }

  try {
    console.log(guestId, validatedFields.data);
  } catch (e) {
    console.error('updateGuestById', e);
    return {
      message: 'Internal Server Error. Failed to Update Guest.',
    };
  }

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

export { paginateGuestList, fetchGuestById, createGuest, updateGuestById };
