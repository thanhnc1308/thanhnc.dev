export enum GuestStatus {
  Accepted = 'accepted',
  Declined = 'declined',
  Pending = 'pending',
}

export type Guest = {
  id: string;
  name: string;
  status: GuestStatus;
  memberCount: number;
};

export type GuestListPaginationResponse = {
  data: Guest[];
  totalPages: number;
};
