import {
  Button,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import Modal from '../common/Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { DialogRouterIdentifier } from '@/types/dialog-router-identifier';
import { deleteGuestById } from '@/actions/guest.action';
import toast from 'react-hot-toast';

export default function DeleteGuestDialog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDeleteGuest = async () => {
    try {
      const guestId = searchParams.get('id');
      await deleteGuestById(guestId);
      toast.success('Guest deleted successfully');
      router.back();
    } catch (error) {
      console.error('handleDeleteGuest', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.message);
    }
  };

  return (
    <Modal routeName={DialogRouterIdentifier.DeleteGuest}>
      <DialogBackdrop className='fixed inset-0 bg-black/30' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
          >
            <DialogTitle as='h3' className='text-base/7 font-medium'>
              Delete guest confirmation
            </DialogTitle>
            <p className='mt-2 text-sm/6'>Delete this guest from the list?</p>
            <div className='mt-4 flex justify-end'>
              <Button
                className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 mr-2 cursor-pointer'
                onClick={handleDeleteGuest}
              >
                Accept
              </Button>
              <Button
                className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 cursor-pointer'
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Modal>
  );
}
