'use client';

import Link from 'next/link';
import { CheckIcon, ClockIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Guest, GuestConfirmationStatus, GuestSource } from '@/types/guest';
import { Button } from '@headlessui/react';
import { ActionType } from '@/types/common';
import {
  createGuest,
  GuestState,
  updateGuestById,
} from '@/actions/guest.action';
import { useActionState } from 'react';

export default function Form({
  guest,
  actionType,
}: {
  guest: Guest;
  actionType: ActionType;
}) {
  const initialState: GuestState = { message: null, errors: {} };
  const action =
    actionType === ActionType.Create
      ? createGuest
      : updateGuestById.bind(null, guest._id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form id={guest._id} action={formAction}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        {/* Guest name */}
        <div className='mb-4'>
          <label htmlFor='name' className='mb-2 block text-sm font-medium'>
            Name
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='name'
                name='name'
                type='text'
                required
                defaultValue={guest.name}
                placeholder='Guest name'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              />
            </div>
          </div>
        </div>

        {/* Member count */}
        <div className='mb-4'>
          <label htmlFor='amount' className='mb-2 block text-sm font-medium'>
            Member Count
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='memberCount'
                name='memberCount'
                type='number'
                step='1'
                required
                defaultValue={guest.memberCount}
                placeholder='Member Count'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              />
            </div>
          </div>
        </div>

        {/* Invited */}
        <label className='flex items-center mb-2 text-sm font-medium'>
          Invited
          <input
            type='checkbox'
            className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 ml-2'
            id='invited'
            name='invited'
            defaultChecked={guest.invited}
          />
        </label>

        {/* Guest Status */}
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>
            Guest status
          </legend>
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id={GuestConfirmationStatus.Accepted}
                  name='status'
                  type='radio'
                  value={GuestConfirmationStatus.Accepted}
                  defaultChecked={
                    guest.status === GuestConfirmationStatus.Accepted
                  }
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor={GuestConfirmationStatus.Accepted}
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
                >
                  Accepted <CheckIcon className='h-4 w-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id={GuestConfirmationStatus.Pending}
                  name='status'
                  type='radio'
                  value={GuestConfirmationStatus.Pending}
                  defaultChecked={
                    guest.status === GuestConfirmationStatus.Pending
                  }
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor={GuestConfirmationStatus.Pending}
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
                >
                  Pending <ClockIcon className='h-4 w-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id={GuestConfirmationStatus.Declined}
                  name='status'
                  type='radio'
                  value={GuestConfirmationStatus.Declined}
                  defaultChecked={
                    guest.status === GuestConfirmationStatus.Declined
                  }
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor={GuestConfirmationStatus.Declined}
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white'
                >
                  Declined <MinusIcon className='h-4 w-4' />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Guest Source */}
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>
            Guest source
          </legend>
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id={GuestSource.Groom}
                  name='guestSource'
                  type='radio'
                  value={GuestSource.Groom}
                  defaultChecked={guest.guestSource === GuestSource.Groom}
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor={GuestSource.Groom}
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium'
                >
                  Groom
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id={GuestSource.Bride}
                  name='guestSource'
                  type='radio'
                  value={GuestSource.Bride}
                  defaultChecked={guest.guestSource === GuestSource.Bride}
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
                />
                <label
                  htmlFor={GuestSource.Bride}
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium'
                >
                  Bride
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className='mt-6 flex justify-end gap-4 md:p-6'>
        <Link
          href='/admin/guest-list'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 cursor-pointer'
          type='submit'
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
