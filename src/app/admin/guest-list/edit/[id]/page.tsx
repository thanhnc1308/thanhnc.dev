import { fetchGuestById } from '@/actions/guest.action';
import Breadcrumbs from '@/components/guest-list/Breadcrumbs';
import GuestDetailForm from '@/components/guest-list/GuestDetailForm';
import { ActionType } from '@/types/common';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const guest = await fetchGuestById(id);

  if (!guest) {
    notFound();
  }

  return (
    <main>
      <div className='p-4 md:p-6'>
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
      </div>
      <GuestDetailForm actionType={ActionType.Update} guest={guest} />
    </main>
  );
}
