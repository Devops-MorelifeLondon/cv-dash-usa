import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authReducer from "./authSlice";

// 1. Configure Persistence
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // whitelist: ['auth'], // Optional: Only persist the 'auth' slice
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// 2. Create Store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 3. Create Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;