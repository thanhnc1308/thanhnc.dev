import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

const navigation = [
  { name: 'Guest List', href: '#', current: true },
  { name: 'Wedding editor', href: '#', current: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              {/* Mobile menu button*/}
              <button className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'>
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon
                  aria-hidden='true'
                  className='block size-6 group-data-open:hidden'
                />
                <XMarkIcon
                  aria-hidden='true'
                  className='hidden size-6 group-data-open:block'
                />
              </button>
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={clsx(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              {/* Profile dropdown */}
              <Menu>
                <MenuButton className='relative flex rounded-full bg-gray-800 text-sm cursor-pointer data-[active]:bg-blue-200'>
                  <UserCircleIcon className='size-6 text-white' />
                </MenuButton>
                <MenuItems anchor='bottom'>
                  <MenuItem>
                    <div className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden'>
                      Sign out
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <div className='sm:hidden'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={clsx(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
}
