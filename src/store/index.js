import { legacy_createStore as createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import persistedReducer from './mudules/reduxPersist';
import rootReducer from './mudules/rootReducer';
import rootSaga from './mudules/rootSaga.';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
