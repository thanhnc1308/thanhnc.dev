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

const GuestSchema = z.object({
  id: z.string(),
  name: z.string(),
  memberCount: z.coerce.number(),
  status: z.enum([
    GuestStatus.Accepted,
    GuestStatus.Pending,
    GuestStatus.Declined,
  ]),
});
const CreateGuestSchema = GuestSchema.omit({ id: true });
const UpdateGuestSchema = GuestSchema.omit({ id: true });

const listPagePath = '/admin/guest-list';

const createGuest = async (formData: FormData) => {
  const newGuest = CreateGuestSchema.parse({
    name: formData.get('name'),
    memberCount: formData.get('memberCount'),
    status: formData.get('status'),
  });
  console.log(newGuest);

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

const updateGuestById = async (guestId: string, formData: FormData) => {
  const newGuest = UpdateGuestSchema.parse({
    name: formData.get('name'),
    memberCount: formData.get('memberCount'),
    status: formData.get('status'),
  });
  console.log({ guestId, newGuest });

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

export { paginateGuestList, fetchGuestById, createGuest, updateGuestById };
