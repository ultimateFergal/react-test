import React, { lazy, Suspense } from "react";

// redux
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import SearchBar from "./components/SearchBar.tsx";

import { Routes, Route, Link } from "react-router-dom";
import SearchHistory from "./components/SearchHistory.tsx";
import { HOME_ROUTE, SEARCH_HISTORY_ROUTE } from "./common/constants.ts";

const TrendingGifsGrid = lazy(
  () => import("./components/TrendingGifsGrid.tsx")
);
const SearchResultsGrid = lazy(() => import("./components/SearchResultsGrid"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="mx-auto grid grid-cols-5 h-screen">
        <header className="sticky top-0 col-span-5 p-10 bg-black z-50">
          <span className="text-white text-5xl">GifSearch!</span>
          <SearchBar />
        </header>

        <aside className="col-span-5 md:col-span-1 p-10 bg-gray-800 row-span-11 font-extrabold text-white flex justify-center items-center md:justify-start md:items-start z-40">
          <ul className="fixed flex md:flex-col mx-auto justify-between gap-x-3 z-40 text-lg md:text-sm lg:text-lg xl:text-lg">
            <li className="hover:text-black">
              <Link to={HOME_ROUTE}>Trending</Link>
            </li>
            <li className="hover:text-black">
              <Link to={SEARCH_HISTORY_ROUTE}>Search history</Link>
            </li>
          </ul>
        </aside>

        <main className="col-span-5 md:col-span-4 p-10 bg-black ">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={HOME_ROUTE} element={<TrendingGifsGrid />} />
              <Route path="/search/:keyword" element={<SearchResultsGrid />} />
              <Route path={SEARCH_HISTORY_ROUTE} element={<SearchHistory />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Provider>
  );
};

export default App;
