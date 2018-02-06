import { log } from '../lib/util';

export default (store) => (next) => (action) => {
  try {
    log('__ACTION__', action);
    const result = next(action);
    log('__STATE__', store.getState());
    return result;
  } catch (error) {
    log('__ERRORR__', error);
    return { ...action, error };
  }
};
