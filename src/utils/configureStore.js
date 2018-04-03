import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import Reducers from '../reducers';
import MainSaga from '../sagas/sagas';

const persistConfig = {
  storage: AsyncStorage,
  whitelist: ['app']
};

const sagaMiddleware = createSagaMiddleware();

export default () => {
  let store = createStore(
    Reducers, 
    {}, 
    composeWithDevTools(
      applyMiddleware(sagaMiddleware/*, Logger*/),
      autoRehydrate()
    )
  );
  sagaMiddleware.run(MainSaga);

  let persistor = persistStore(store, persistConfig);
  return { store, persistor }
}