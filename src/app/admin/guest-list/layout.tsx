import { Suspense } from 'react';

export default function Layout({
  children,
  removeGuestDialog,
}: {
  children: React.ReactNode;
  removeGuestDialog: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense>{removeGuestDialog}</Suspense>
    </>
  );
}
