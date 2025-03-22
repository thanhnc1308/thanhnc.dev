export enum GuestConfirmationStatus {
  Accepted = 'accepted',
  Declined = 'declined',
  Pending = 'pending',
}

export enum GuestSource {
  Groom = 'groom',
  Bride = 'bride',
}

export type Guest = {
  _id: string;
  name: string;
  status: GuestConfirmationStatus;
  memberCount: number;
  invited: boolean;
  guestSource: GuestSource;
};

export type GuestListPaginationResponse = {
  data: Guest[];
  total: number;
};
