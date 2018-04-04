import superagent from 'superagent';

import { log } from '../lib/util';
import { setLoginError } from './status';
import { cookieDelete } from '../lib/cookie';
import { removeSocketAction } from './socket';
import { getSavedRoomsAction } from './savedRooms';

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
  delete localStorage.firePollsToken;
  store.dispatch(removeTokenAction());
};

export const signupAction = (user, failureCB) => ({ dispatch }) =>
  superagent.post(`${API_URL}/signup`)
    .send(user)
    .withCredentials()
    .then(({ text }) => {
      localStorage.firePollsToken = text;
      dispatch(setTokenAction(text));
    })
    .catch(failureCB);

export const loginAction = (user, failureCB) => ({ dispatch }) =>
  superagent.get(`${API_URL}/login`)
    .auth(user.username, user.password)
    .withCredentials()
    .then(({ text }) => {
      localStorage.firePollsToken = text;
      dispatch(setTokenAction(text));
      dispatch(getSavedRoomsAction(text));
    })
    .catch(failureCB);
