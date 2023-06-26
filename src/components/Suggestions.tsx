import React from "react";
import { getSearchSuggestions } from "../api/requests";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { setSearchWord, setShowSuggestions, setSuggestionsSearchWord } from "../store/slices/gifs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Suggestions: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { suggestionsSearchWord, showSuggestions } = useSelector(
    (state: RootState) => state?.gifs
  );

  const {
    status,
    error,
    data: SuggestionsList,
    isPreviousData,
  } = useQuery({
    queryKey: ["data", { suggestionsSearchWord }],
    // keepPreviousData: true,
    queryFn: () => getSearchSuggestions(suggestionsSearchWord),
  });

  return (
    SuggestionsList && showSuggestions && (
      <ul className="absolute w-full z-50">
        {SuggestionsList?.data.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(setSearchWord(suggestion?.name));
              navigate(`/search/${suggestion?.name}`);
              dispatch(setSuggestionsSearchWord(''));
              dispatch(setShowSuggestions(false));
            }}
            className={twMerge(
              "bg-white block p-2.5 w-full z-20 text-sm text-gray-900",
              "border-l-gray-50 border-l-2 border border-gray-300",
              "focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:font-black"
            )}
          >
            {suggestion?.name}
          </li>
        ))}
      </ul>
    )
  );
};

export default Suggestions;
