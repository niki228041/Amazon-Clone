import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from '../features/user/user-slice'

import { apiProductSlice } from "../features/user/apiProductSlice";

export const store = configureStore({
  reducer: {
    [apiProductSlice.reducerPath]:apiProductSlice.reducer,
    user: userSlice,
  },
  middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiProductSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;