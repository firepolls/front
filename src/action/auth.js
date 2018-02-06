import superagent from 'superagent';

import { log } from '../lib/util';
import { cookieDelete } from '../lib/cookie';
import { removeSocketAction } from './socket';

const COOKIE = 'Socket-Token';

export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});

export const logoutAction = (socket) => (store) => {
  cookieDelete(COOKIE);
  if (socket) store.dispatch(removeSocketAction(socket));
  store.dispatch(removeTokenAction());
};

export const signupAction = (user) => (store) =>
  superagent.post(`${API_URL}/signup`)
    .send(user)
    .withCredentials()
    .then(({ text }) =>
      store.dispatch(setTokenAction(text))
    )
    .catch(log);
  // TODO: Rob - we need error handling here

export const loginAction = (user) => (store) =>
  superagent.get(`${API_URL}/login`)
    .auth(user.username, user.password)
    .withCredentials()
    .then(({ text }) =>
      store.dispatch(setTokenAction(text))
    )
    .catch(log);
  // TODO: Rob - we need error handling here
