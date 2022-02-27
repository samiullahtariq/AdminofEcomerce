import {combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import productReducer from './productReducer';
/// for login and register process
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";

  
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }


  const rootReducer = combineReducers({user : userReducer , product : productReducer})
  //we want to persist user reducer and cart 
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    // using persistedReducer cause it contains cart and userReducer
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})

//exporting persist store as well
export let persistor = persistStore(store)

export default store