import superagent from 'superagent';

export const addSavedRoomAction = savedRoom => ({
  type: 'SAVED_ROOM_SET',
  payload: savedRoom,
});

export const addAllSavedRoomsAction = savedRooms => ({
  type: 'ALL_SAVED_ROOMS_SET',
  payload: savedRooms,
});

export const saveRoomAction = ({ roomData, token }) => (store) => 
  superagent.post(`${API_URL}/session`)
    .set('Authorization', `Bearer ${token}`)
    .send(roomData)
    .then(response => {
      const { roomName, roomNameRaw, polls } = response.body;
      store.dispatch(addSavedRoomAction({ roomName, roomNameRaw, polls }));
    })
    .catch(console.log);

export const getSavedRoomsAction = (token) => (store) =>
  superagent.get(`${API_URL}/sessions`)
    .set('Authorization', `Bearer ${token}`)
    .then(({ body }) => {
      store.dispatch(addAllSavedRoomsAction(body));
    })
    .catch(console.log);
