import { configureStore } from "@reduxjs/toolkit";

// reducer
import gifs from "./slices/gifs";

export const store = configureStore({
  reducer: {
    gifs,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
