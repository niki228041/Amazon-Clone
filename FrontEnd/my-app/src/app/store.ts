import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from '../features/user/user-slice'

import { apiProductSlice } from "../features/user/apiProductSlice";
import { apiCategorySlice } from "../features/user/apiCategorySlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import ordersStateSlice from "../features/user/ordersStateSlice";

export const store = configureStore({
  reducer: {
    [apiProductSlice.reducerPath]:apiProductSlice.reducer,
    [apiCategorySlice.reducerPath]:apiCategorySlice.reducer,
    // user: userSlice,
    orders: ordersStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiProductSlice.middleware,apiCategorySlice.middleware),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;