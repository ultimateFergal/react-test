import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PLACEHOLDER_IMAGE from "../assets/images/giphy.webp";
import { useDispatch } from "react-redux";
import { setCurrentSliderGif, setShowModal } from "../store/slices/gifs";
import { IGif } from "../types/gif";

type GridItemProps = {
  gif: IGif
};

const GridItem = ({ gif }: GridItemProps) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(setCurrentSliderGif(gif))
        dispatch(setShowModal(true))
      }}
      className="flex flex-col bg-white drop-shadow hover:drop-shadow-lg hover:opacity-70 rounded-md h-full"
    >
      <LazyLoadImage
        src={gif.images.fixed_width.url}
        alt="Fiction Product"
        className="h-64 object-cover rounded-tl-md rounded-tr-md"
        width={'100%'}
        // effect='blur'
        placeholderSrc={PLACEHOLDER_IMAGE}
      />

      <div className="px-3 py-2 text-ellipsis overflow-hidden whitespace-nowrap">
        <h1 className="font-semibold">{gif.title}</h1>
        <p className="text-sm">{gif.username}</p>
      </div>
    </div>
  );
};

export default GridItem;
