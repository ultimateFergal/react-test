import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { getSearchResults } from "../api/requests.ts";
import { useQuery } from "@tanstack/react-query";
import GridItem from "./GridItem.tsx";
import { IGif } from "../types/gif.ts";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination.tsx";
import { DisplayModal } from "./DisplayModal.tsx";
import { setGifsSlider } from "../store/slices/gifs";
import { ITEMS_PER_PAGE } from "../common/constants.ts";

const SearchResultsGrid: React.FC = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const paramSearchWord = routeParams?.keyword ?? "";
  const [page, setPage] = useState(0);

  const {
    status,
    data: itemsList,
  } = useQuery({
    queryKey: ["data", { paramSearchWord, page }],
    queryFn: () => getSearchResults(paramSearchWord, page),
  });

  useEffect(() => {
    if (itemsList?.data && itemsList?.data?.length > 0) {
      dispatch(setGifsSlider(itemsList?.data));
    }
  }, [itemsList?.data]);

  const pageCount = Math.ceil(
    (itemsList?.pagination.total_count ?? 0) / ITEMS_PER_PAGE
  );

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);
  };

  if (status === "loading") return <div className="font-bold min-h-screen h-full text-white flex justify-center">Loading...</div>;
  if (status === "error") return <div className="font-bold min-h-screen h-full text-white flex justify-center">Something went wrong.Try again!</div>;

  return (
    <>
      <DisplayModal />
      <h1 className="text-2xl text-white mb-4">Results for: {paramSearchWord}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {itemsList &&
          itemsList?.data.map(
            (gif: IGif) => gif && <GridItem key={gif.id} gif={gif} />
          )}
      </div>
      <Pagination
        currentPage={page}
        pageCount={pageCount}
        onPageChange={handlePageClick}
      />
    </>
  );
};

export default SearchResultsGrid;
