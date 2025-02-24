import Search from '@/common/Search';
import Table from '@/common/Table';
import TableSkeletons from '@/common/TableSkeletons';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function GuestListPage(props: {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className='w-full px-5'>
      <div className='mt-4 flex items-center justify-end gap-2 md:mt-8'>
        <div className='w-100'>
          <Search placeholder='Search guest...' />
        </div>
        <button className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
          <span className='hidden md:block'>Import</span>{' '}
          <PlusIcon className='h-5 md:ml-4' />
        </button>
        <Link
          href='/admin/guest-list/add'
          className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        >
          <span className='hidden md:block'>Add</span>{' '}
          <PlusIcon className='h-5 md:ml-4' />
        </Link>
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeletons />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
