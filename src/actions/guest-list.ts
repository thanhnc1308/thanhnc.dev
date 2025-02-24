import { GuestListPaginationResponse, GuestStatus } from '@/types/guest';
import { PaginationRequest } from '@/types/pagination';

const paginateGuestList = async ({
  query,
  currentPage,
}: PaginationRequest): Promise<GuestListPaginationResponse> => {
  try {
    console.log('query', query, currentPage);

    // mock
    const data = [
      {
        id: '1',
        name: 'John Doe',
        status: GuestStatus.Accepted,
        memberCount: 2,
      },
      {
        id: '2',
        name: 'Jane Doe',
        status: GuestStatus.Pending,
        memberCount: 3,
      },
      {
        id: '3',
        name: 'John Smith',
        status: GuestStatus.Declined,
        memberCount: 1,
      },
    ];

    return {
      totalPages: 100,
      data,
    };
  } catch (error) {
    console.error('paginateGuestList', error);
    return {
      totalPages: 0,
      data: [],
    };
  }
};

export { paginateGuestList };
