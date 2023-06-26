import React from "react";

import ReactPaginate, { ReactPaginateProps } from "react-paginate";
export type OnPageChangeCallback = ReactPaginateProps["onPageChange"];

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange?: OnPageChangeCallback;
}

export const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className={"classnames('issuesPagination', styles.pagination)"}>
      <ReactPaginate
        forcePage={currentPage}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        nextLabel="&rarr;"
        previousLabel="&larr;"
        containerClassName={'bg-red-500 flex justify-between mx-auto w-3/5'}
      />
    </div>
  );
};

export default Pagination;
