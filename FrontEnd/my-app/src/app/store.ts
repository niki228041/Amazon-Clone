import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from '../features/user/user-slice'

import { apiProductSlice } from "../features/user/apiProductSlice";
import { apiCategorySlice } from "../features/user/apiCategorySlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {apiOptionsSlice} from "../features/user/apiOptionsSlice"
import ordersStateSlice from "../features/user/ordersStateSlice";
import { apiCommentSlice } from "../features/user/apiCommentSlice";
import { apiPlayerSlice } from "../features/user/apiPlayerSlice";

export const store = configureStore({
  reducer: {
    [apiProductSlice.reducerPath]:apiProductSlice.reducer,
    [apiCategorySlice.reducerPath]:apiCategorySlice.reducer,
    [apiOptionsSlice.reducerPath]:apiOptionsSlice.reducer,
    [apiCommentSlice.reducerPath]:apiCommentSlice.reducer,
    [apiPlayerSlice.reducerPath]:apiPlayerSlice.reducer,
    user: userSlice,
    orders: ordersStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiProductSlice.middleware,
      apiCategorySlice.middleware,
      apiOptionsSlice.middleware,
      apiCommentSlice.middleware,
      apiPlayerSlice.middleware),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;