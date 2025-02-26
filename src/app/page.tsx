import ProfileDropdown from '@/components/navbar/ProfileDropdown';

export default function Home() {
  return (
    <div className='w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='w-full flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <nav className='w-full bg-gray-800'>
          <div className='flex mx-auto items-center justify-between max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='flex text-white'>thanhnc.dev</div>
            <div className='flex'>
              <ProfileDropdown />
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
