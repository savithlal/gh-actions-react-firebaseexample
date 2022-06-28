import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import galleryReducer from '../Reducers/GalleryReducer';
import lineItemReducer from '../Reducers/LineItemReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from '../Reducers/Index';
import createSagaMiddleware from 'redux-saga';

// import rootSaga from '../saga/saga.js';
import rootSaga from '../Saga/Saga';
/**
 * persistConfig: Configurations for redux-persist
 * @param key: Key for the redux-persist
 * @param storage: Storage used for the redux-persist
 * @param whitelist: Redux state values that has to be saved to device storage
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['capturedImages', 'lineItems'],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, reducers);
export default function configureStore() {
  const enhancers = [applyMiddleware(sagaMiddleware)];
  const store = createStore(persistedReducer, compose(...enhancers));

  const persistor = persistStore(store);
  // persistor.purge();
  sagaMiddleware.run(rootSaga, store.dispatch);

  return {persistor, store}; //store; //  {persistor, store};
}
