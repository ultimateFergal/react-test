import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Search } from "react-feather";
import useDebounce from "../hooks/useDebounce";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addtoSearchHistory, setSearchWord, setShowSuggestions, setSuggestionsSearchWord } from "../store/slices/gifs";

import { useNavigate } from "react-router-dom";

import Suggestions from "./Suggestions";
import { twMerge } from "tailwind-merge";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchWord } = useSelector((state: RootState) => state?.gifs);
  const [keyword, setKeyword] = useState(searchWord);
  const debouncedSuggestionsKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedSuggestionsKeyword !== "") {
      dispatch(setSuggestionsSearchWord(debouncedSuggestionsKeyword));
    }
  }, [dispatch, debouncedSuggestionsKeyword]);

  useEffect(() => {
    setKeyword(searchWord);
    dispatch(setShowSuggestions(false));
  }, [searchWord])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value, "value fdo");
    setKeyword(value);
    dispatch(setShowSuggestions(true));
  };

  const handleSubmit = () => {
    if (keyword != "") {
      dispatch(setSearchWord(keyword));
      dispatch(addtoSearchHistory(keyword))
      navigate(`/search/${keyword}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        id="location-search"
        className={twMerge(
          "block p-2.5 w-full z-20 text-sm text-gray-900 bg-white-500 rounded-r-lg border-l-gray-50 ",
          "border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        )}
        placeholder="Search for Gifs"
        required
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={keyword}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className={twMerge(
          "absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg ",
          "border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        )}
      >
        <Search size={24} className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </button>
      <Suggestions />
    </div>
  );
};

export default SearchBar;
