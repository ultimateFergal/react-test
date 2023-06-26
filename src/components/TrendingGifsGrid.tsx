import React from "react";

import { getData } from "../api/requests.ts";
import { useQuery } from "@tanstack/react-query";
import GridItem from "./GridItem.tsx";

const TrendingGifsGrid: React.FC = () => {
  const {
    status,
    data: itemsList,
  } = useQuery({
    queryKey: ["data"],
    queryFn: () => getData(),
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <div className="font-bold min-h-screen h-full text-white flex justify-center">Something went wrong.Try again!</div>;

  return (
    <>
    <h1 className="text-2xl text-white mb-4">Trending Gifs</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      {itemsList &&
        itemsList?.data.map(
          (gif) => gif && <GridItem key={gif.id} gif={gif} />
        )}
    </div>
    </>
  );
};

export default TrendingGifsGrid;
