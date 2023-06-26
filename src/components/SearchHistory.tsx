import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSuggestions } from "../store/slices/gifs";
import { RootState } from "../store";

const SearchHistory: React.FC = () => {
  const dispatch = useDispatch();
  const { searchHistory } = useSelector((state: RootState) => state?.gifs);

  if (searchHistory.length == 0)
    return <div className="font-bold min-h-screen h-full text-white flex justify-center">Search History Empty!</div>

  return <div className="min-h-screen h-full text-white">
    <ul className="font-extrabold">
      {
        searchHistory.map((item,index) => (
          <li key={index}>{item}</li>
        ))
      }
    </ul>
    <button
      type="button"
      className="border-2 p-4 mt-10"
      onClick={() => dispatch(deleteSuggestions())}>Clear Search History</button>
  </div>;
};

export default SearchHistory;
