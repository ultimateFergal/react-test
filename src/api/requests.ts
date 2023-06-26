import axios from "axios";
import { IGIFData } from "../types/gif";
import { ISuggestion } from "../types/suggestions";
import { GIPHY_API_KEY, ITEMS_PER_PAGE } from "../common/constants";

export function getData(page = 0): Promise<IGIFData> {
  return axios
    .get(
      "https://api.giphy.com/v1/gifs/trending",
      {
        params: {
            api_key: GIPHY_API_KEY,
            limit: 500,
            rating: 'g',
            bundle: 'messaging_non_clips',
            offset: page
        },
      }
    )
    .then((res) => res.data);
}

export function getSearchResults(query: string, page = 0): Promise<IGIFData> {
  return axios
    .get(
      "https://api.giphy.com/v1/gifs/search",
      {
        params: {
            q: query,
            api_key: GIPHY_API_KEY,
            limit: ITEMS_PER_PAGE,
            rating: 'g',
            bundle: 'messaging_non_clips',
            lang: 'en',
            offset: page
        },
      }
    )
    .then((res) => res.data);
}

export function getSearchSuggestions(query: string): Promise<ISuggestion> {
  return axios
    .get(
      "https://api.giphy.com/v1/gifs/search/tags",
      {
        params: {
            q: query,
            api_key: GIPHY_API_KEY,
            limit: 7,
            offset: 0
        },
      }
    )
    .then((res) => res.data);
}


