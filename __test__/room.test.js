import reducer from '../src/reducer/room';

describe('Room Reducer', () => {
  test('ROOM_SET should return a room payload', () => {
    const action = {
      type: 'ROOM_SET',
      payload: {
        roomPayload: 'room',
      },
    };
    const state = reducer(undefined, action);
    expect(state).toEqual(action.payload);
  });

  test('ROOM_REMOVE should return a room payload', () => {
    const action = { type: 'ROOM_REMOVE' };
    const state = reducer(undefined, action);
    expect(state).toEqual(null);
  });

  test('ROOM_COUNT_INCREMENT should increment the number of voters in the room by one', () => {
    const action = { type: 'ROOM_COUNT_INCREMENT' };
    const state = reducer({ voters: 0 }, action);
    expect(state).toEqual(state);
  });

  test('ROOM_COUNT_INCREMENT should decrement the number of voters in the room by one', () => {
    const action = { type: 'ROOM_COUNT_DECREMENT' };
    const state = reducer({ voters: 1 }, action);
    expect(state).toEqual(state);
  });

  test('POLL_CREATE should create a new poll', () => {
    const action = {
      type: 'POLL_CREATE',
      payload: {
        polls: 'new poll',
      },
    };
    const state = reducer({ polls: [] }, action);
    expect(state.polls[0].polls).toEqual(action.payload.polls);
  });
});
