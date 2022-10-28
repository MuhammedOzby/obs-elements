import { configureStore } from "@reduxjs/toolkit";
import obsConnectionReducer from "./connectionInfo.slice";

export const store = configureStore({
  reducer: {
    obsConnection: obsConnectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
