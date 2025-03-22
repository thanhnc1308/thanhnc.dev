export interface PaginationRequest {
  queryString?: string;
  sortString?: string;
  currentPage?: number;
  rowsPerPage?: number;
}
