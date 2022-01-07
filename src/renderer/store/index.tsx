import { createStore,applyMiddleware,combineReducers } from 'redux';

import chatReducer from '../reducer/chats';
import authReducer from '../reducer/auth';
import appReducer from '../reducer/app';

import ReduxMiddleWare from 'redux-thunk';

import NotificationsMiddle from './Middleware/app'

export default function configureStore() {

  const middleWare=[
    ReduxMiddleWare,
    NotificationsMiddle
  ]
  const store = createStore(combineReducers({
    chats:chatReducer,
    auth:authReducer,
    app:appReducer
  }),applyMiddleware(...middleWare));

  return store;
}