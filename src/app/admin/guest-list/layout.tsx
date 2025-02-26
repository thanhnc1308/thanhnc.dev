export default function Layout({
  children,
  removeGuestDialog,
  importGuestsDialog,
}: {
  children: React.ReactNode;
  removeGuestDialog: React.ReactNode;
  importGuestsDialog: React.ReactNode;
}) {
  return (
    <>
      {children}
      {removeGuestDialog}
      {importGuestsDialog}
    </>
  );
}
