import reducer from '../src/reducer/auth';

describe('Auth Reducer', () => {
  test('TOKEN_SET should set and return a token', () => {
    const action = {
      type: 'TOKEN_SET',
      payload: 'token',
    };
    const state = reducer(undefined, action);
    expect(state).toEqual(action.payload);
  });

  test('TOKEN_REMOVE should remove a token and return nothing', () => {
    const action = {
      type: 'TOKEN_REMOVE',
    };
    const state = reducer(undefined, action);
    expect(state).toEqual(null);
  });

  test('passing in a type that is not defined returns default state', () => {
    const action = 'hi';
    const state = reducer(undefined, action);
    expect(state).toEqual(null);
  });
});
