import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings, LazyLoadTypes } from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { setShowModal } from "../store/slices/gifs";
import { RootState } from "../store";
import { IGif } from "../types/gif";
import GridItem from "./GridItem";
import { twMerge } from "tailwind-merge";

export const DisplayModal: React.FC = function DisplayModal() {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { currentSliderGif, gifsSlider, showModal } = useSelector(
    (state: RootState) => state?.gifs
  );

  useEffect(() => {
    const modlalClose = (e: Event) => {
      if (showModal && ref.current && !ref.current.contains(e.target as Node)) {
        dispatch(setShowModal(false));
      }
    };
    document.addEventListener("mousedown", modlalClose);
    return () => {
      document.removeEventListener("mousedown", modlalClose);
    };
  }, [showModal]);

  const sliderSettings: Settings = {
    dots: false,
    lazyLoad: "ondemand" as LazyLoadTypes,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: gifsSlider.indexOf(currentSliderGif as IGif),
  };

  return showModal ? (
    <>
      <div
        id="defaultModal"
        aria-hidden="true"
        className={twMerge(
          "flex justify-center items-center inset-0 fixed",
          "top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto",
          "md:inset-0 h-[calc(100%-1rem)] max-h-full"
        )}
      >
        <div className="relative w-full max-w-4xl max-h-full mx-auto" ref={ref}>
          <div className="relative rounded-lg shadow bg-black border-2 border-white">
            <div className="p-7">
              <Slider {...sliderSettings}>
                {gifsSlider.map(
                  (gif: IGif) =>
                    gif && (
                      <a key={gif.id} href={gif.url}>
                        <GridItem gif={gif} />
                      </a>
                    )
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
};
