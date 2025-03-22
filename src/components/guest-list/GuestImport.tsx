'use client';

import { Button } from '@headlessui/react';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../common/Spinner';

export default function GuestImport() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImport = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const data = new FormData();
      data.append('file', file);

      await fetch('/api/import', {
        method: 'POST',
        body: data,
      });

      toast.success('Guests imported successfully');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Error importing guests');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <input
        ref={fileInputRef}
        type='file'
        className='hidden'
        disabled={isUploading}
        onChange={handleImport}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer'
      >
        <span className='hidden md:block'>Import</span>{' '}
        <PlusIcon className='h-5 md:ml-4' />
      </Button>
      {isUploading && (
        <div className='ml-2'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
