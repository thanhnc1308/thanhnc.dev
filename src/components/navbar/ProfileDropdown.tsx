import { signOut } from '@/auth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { auth } from '@/auth';
import Image from 'next/image';

export default async function ProfileDropdown() {
  const session = await auth();
  const user = session?.user;

  return (
    <Menu>
      <MenuButton className='flex rounded-full items-center justify-center bg-gray-800 text-sm cursor-pointer'>
        {user?.name && <div className='mr-2 text-white'>{user.name}</div>}
        {!user?.name && <div className='mr-2 text-white'>Anonymous</div>}
        {user?.image && (
          <Image
            src={user.image}
            alt='Profile Image'
            width={32}
            height={32}
            className='rounded-full'
          />
        )}
        {!user?.image && <UserCircleIcon className='size-10 text-white' />}
      </MenuButton>
      <MenuItems transition anchor='bottom' className={'mt-2'}>
        <MenuItem>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button className='flex grow items-center justify-center gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer h-8'>
              <PowerIcon className='w-6 h-5' />
              <div className='hidden md:block'>Sign Out</div>
            </button>
          </form>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
