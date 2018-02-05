import { cookieFetch } from '../lib/cookie';

const COOKIE = 'Socket-Token';
const emptyState = null;
const initialState = cookieFetch(COOKIE) || emptyState;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return emptyState;
    default:
      return state;
  }
};
