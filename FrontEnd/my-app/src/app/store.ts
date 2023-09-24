import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from '../features/user/user-slice';



import { apiProductSlice } from "../features/user/apiProductSlice";
import { apiCategorySlice } from "../features/user/apiCategorySlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {apiOptionsSlice} from "../features/user/apiOptionsSlice"
import ordersStateSlice from "../features/user/ordersStateSlice";
import { apiCommentSlice } from "../features/user/apiCommentSlice";
import { apiPlayerSlice } from "../features/user/apiPlayerSlice";
import { apiCardSlice } from "../features/user/apiCardSlice";
import { apiAddressSlice } from "../features/user/apiAddressSlice";
import { apiOrderSlice } from "../features/user/apiOrderSlice";
import { apiCompanySlice } from "../features/user/apiCompanySlice";
import musicStateSlice from "../features/user/musicStateSlice";
import { apiFAQSlice } from "../features/user/apiFAQSlice";
import modalWindowsStateSlice from "../features/user/modalWindowsStateSlice";
import CurrencyStateSlice from "../features/user/CurrencyStateSlice";
import { apiCurrencySlice } from "../features/user/apiCurrencySlice";
import { apiCountriesSlice } from "../features/user/apiCountriesSlice";
import { apiUserSlice } from "../features/user/apiUserSlice";


export const store = configureStore({
  reducer: {
    [apiProductSlice.reducerPath]:apiProductSlice.reducer,
    [apiCategorySlice.reducerPath]:apiCategorySlice.reducer,
    [apiOptionsSlice.reducerPath]:apiOptionsSlice.reducer,
    [apiCommentSlice.reducerPath]:apiCommentSlice.reducer,
    [apiPlayerSlice.reducerPath]:apiPlayerSlice.reducer,
    [apiCardSlice.reducerPath]:apiCardSlice.reducer,
    [apiAddressSlice.reducerPath]:apiAddressSlice.reducer,
    [apiOrderSlice.reducerPath]:apiOrderSlice.reducer,
    [apiCompanySlice.reducerPath]:apiCompanySlice.reducer,
    [apiFAQSlice.reducerPath]:apiFAQSlice.reducer,
    [apiCurrencySlice.reducerPath]:apiCurrencySlice.reducer,
    [apiCountriesSlice.reducerPath]:apiCountriesSlice.reducer,
    [apiUserSlice.reducerPath]:apiUserSlice.reducer,

    user: userSlice,
    orders: ordersStateSlice,
    track: musicStateSlice,
    modalWindows:modalWindowsStateSlice,
    currency:CurrencyStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiProductSlice.middleware,
      apiCategorySlice.middleware,
      apiOptionsSlice.middleware,
      apiCommentSlice.middleware,
      apiPlayerSlice.middleware,
      apiCardSlice.middleware,
      apiOrderSlice.middleware,
      apiAddressSlice.middleware,
      apiCompanySlice.middleware,
      apiFAQSlice.middleware,
      apiCurrencySlice.middleware,
      apiCountriesSlice.middleware,
      apiUserSlice.middleware),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;