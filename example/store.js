import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import logger from 'redux-logger';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import mainReducer from './src/mainReducer';

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage: AsyncStorage,
  whitelist: ['chats'],
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  // .concat(logger),
});
const persistor = persistStore(store);

export const storeWithPersistor = {
  store,
  persistor,
};
