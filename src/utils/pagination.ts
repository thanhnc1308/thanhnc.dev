const generatePagination = (currentPage: number, totalPage: number) => {
  // If the totalPage number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPage - 1, totalPage];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPage - 2) {
    return [1, 2, '...', totalPage - 2, totalPage - 1, totalPage];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPage,
  ];
};

export { generatePagination };
