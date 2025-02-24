import Breadcrumbs from '@/components/guest-list/Breadcrumbs';
import GuestDetailForm from '@/components/guest-list/GuestDetailForm';
import { ActionType } from '@/types/common';
import { Guest, GuestStatus } from '@/types/guest';

export default async function Page() {
  const defaultGuest: Guest = {
    id: '',
    name: '',
    memberCount: 1,
    status: GuestStatus.Pending,
  };

  return (
    <main>
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
      <GuestDetailForm actionType={ActionType.Create} guest={defaultGuest} />
    </main>
  );
}
