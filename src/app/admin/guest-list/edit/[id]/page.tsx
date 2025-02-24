import { fetchGuestById } from '@/actions/guest-list';
import Breadcrumbs from '@/components/guest-list/Breadcrumbs';
import GuestDetailForm from '@/components/guest-list/GuestDetailForm';
import { ActionType } from '@/types/common';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const guest = await fetchGuestById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Guest list', href: '/admin/guest-list' },
          {
            label: 'Edit guest',
            href: `/admin/guest-list/edit/${id}`,
            active: true,
          },
        ]}
      />
      <GuestDetailForm actionType={ActionType.Update} guest={guest} />
    </main>
  );
}
