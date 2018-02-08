import reducer from '../src/reducer/profile';

describe('Profile Reducer', () => {
  test('PROFILE_SET should', () => {
    const action = {
      type: 'PROFILE_SET',
      payload: {
        firstName: 'Shub',
        lastName: 'Bub',
        email: 'ShubBub@email.com',
        account_id: '123456789',
      },
    };
    const state = reducer(undefined, action);
    expect(state).toEqual(action.payload);
  });

  test('PROFILE_SET should throw an error is a profile is not sent', () => {
    const action = () => {
      reducer(undefined, { type: 'PROFILE_SET' });
    };
    expect(action).toThrow('__ERROR__ profile is required!');
  });

  test('PROFILE_SET should throw an error if incomplete profile data is sent', () => {
    const action = () => {
      reducer(undefined, {
        type: 'PROFILE_SET',
        payload: {
          firstName: 'PedjyWedjy',
        },
      });
    };
    expect(action).toThrow('__ERROR__ invalid profile data');
  });

  test('TOKEN_REMOVE', () => {
    const state = reducer('state', { type: 'TOKEN_REMOVE' });
    expect(state).toEqual(null);
  });

  test('passing in a type that is not defined returns default state', () => {
    const action = 'hi';
    const state = reducer(undefined, action);
    expect(state).toEqual(null);
  });
});
