import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGif } from "../../../types/gif";

type GifsState = {
  searchWord: string;
  suggestionsSearchWord: string;
  showSuggestions: boolean;
  searchHistory: string[];
  gifsSlider: IGif[];
  currentSliderGif: IGif | null;
  showModal: boolean;
};

const initialState: GifsState = {
  searchWord: "",
  suggestionsSearchWord: "",
  showSuggestions: false,
  searchHistory: [],
  gifsSlider: [],
  currentSliderGif: null,
  showModal: false,
};

const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
    setSuggestionsSearchWord: (state, action: PayloadAction<string>) => {
      state.suggestionsSearchWord = action.payload;
    },
    setShowSuggestions: (state, action: PayloadAction<boolean>) => {
      state.showSuggestions = action.payload;
    },
    addtoSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory.push(action.payload);
    },
    deleteSuggestions: (state) => {
      state.searchHistory = [];
    },
    setGifsSlider: (state, action: PayloadAction<IGif[]>) => {
      state.gifsSlider = [...action.payload];
    },
    setCurrentSliderGif: (state, action: PayloadAction<IGif>) => {
      state.currentSliderGif = action.payload;
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

export const {
  setSearchWord,
  setSuggestionsSearchWord,
  setShowSuggestions,
  addtoSearchHistory,
  deleteSuggestions,
  setGifsSlider,
  setCurrentSliderGif,
  setShowModal,
} = gifsSlice.actions;

export default gifsSlice.reducer;
