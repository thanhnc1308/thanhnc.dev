import Breadcrumbs from '@/components/guest-list/Breadcrumbs';
import GuestDetailForm from '@/components/guest-list/GuestDetailForm';
import { ActionType } from '@/types/common';
import { Guest, GuestConfirmationStatus, GuestSource } from '@/types/guest';

export default async function Page() {
  const defaultGuest: Guest = {
    _id: '',
    name: '',
    memberCount: 1,
    status: GuestConfirmationStatus.Pending,
    invited: false,
    guestSource: GuestSource.Groom,
  };

  return (
    <main>
      <div className='p-4 md:p-6'>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Guest list', href: '/admin/guest-list' },
            {
              label: 'Add new guest',
              href: '/admin/guest-list/add',
              active: true,
            },
          ]}
        />
      </div>
      <GuestDetailForm actionType={ActionType.Create} guest={defaultGuest} />
    </main>
  );
}
