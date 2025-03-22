import {
  CheckIcon,
  ClockIcon,
  MinusIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Pagination from './Pagination';
import { paginateGuestList } from '@/actions/guest.action';
import { GuestConfirmationStatus } from '@/types/guest';
import Link from 'next/link';
import { DialogRouterIdentifier } from '@/types/dialog-router-identifier';

export function UpdateAction({ id }: { id: string }) {
  return (
    <Link
      id={id}
      href={`/admin/guest-list/edit/${id}`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5' />
    </Link>
  );
}

export function DeleteAction({ id }: { id: string }) {
  return (
    <>
      <Link
        id={id}
        href={`/admin/guest-list?routerIdentifier=${DialogRouterIdentifier.DeleteGuest}&id=${id}`}
        className='rounded-md border p-2 hover:bg-gray-100'
      >
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5' />
      </Link>
    </>
  );
}

export function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500':
            status === GuestConfirmationStatus.Pending,
          'bg-green-500 text-white':
            status === GuestConfirmationStatus.Accepted,
          'bg-red-500 text-white': status === GuestConfirmationStatus.Declined,
        },
      )}
    >
      {status === GuestConfirmationStatus.Pending ? (
        <>
          Pending
          <ClockIcon className='ml-1 w-4 text-gray-500' />
        </>
      ) : null}
      {status === GuestConfirmationStatus.Accepted ? (
        <>
          Accepted
          <CheckIcon className='ml-1 w-4 text-white' />
        </>
      ) : null}
      {status === GuestConfirmationStatus.Declined ? (
        <>
          Declined
          <MinusIcon className='ml-1 w-4 text-white' />
        </>
      ) : null}
    </span>
  );
}

export default async function Table({
  query,
  sort,
  currentPage,
  rowsPerPage,
}: {
  query?: string;
  sort?: string;
  currentPage?: number;
  rowsPerPage: number;
}) {
  const { data, total } = await paginateGuestList({
    queryString: query,
    sortString: sort,
    currentPage,
    rowsPerPage,
  });
  const totalPage = Math.ceil(total / rowsPerPage);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <div className='md:hidden'>
            {data?.map((guest) => (
              <div
                key={guest._id}
                className='mb-2 w-full rounded-md bg-white p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <p className='text-sm text-gray-500'>{guest.name}</p>
                  </div>
                  <Status status={guest.status} />
                </div>
                <div className='flex w-full items-center justify-between pt-4'>
                  <div>
                    <p className='text-xl font-medium'>{guest.memberCount}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <UpdateAction id={guest._id} />
                    <DeleteAction id={guest._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Name
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Status
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Member Count
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Invited
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Guest Source
                </th>
                <th scope='col' className='py-3 pl-6 pr-3'>
                  <span className='sr-only'>Actons</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {data?.map((guest) => (
                <tr
                  key={guest._id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap px-3 py-3'>{guest.name}</td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <Status status={guest.status} />
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {guest.memberCount}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    <input
                      type='checkbox'
                      readOnly
                      checked={guest.invited}
                      className='group block size-4 rounded border bg-white data-[checked]:bg-blue-500'
                    />
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {guest.guestSource}
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      <UpdateAction id={guest._id} />
                      <DeleteAction id={guest._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-5 flex w-full justify-end'>
        <Pagination totalPage={totalPage} />
      </div>
    </div>
  );
}
