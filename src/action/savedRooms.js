import superagent from 'superagent';

export const addSavedRoomAction = savedRoom => ({
  type: 'SAVED_ROOM_SET',
  payload: savedRoom,
});

export const saveRoomAction = ({ roomData, token }) => (store) =>
  superagent.post(`${API_URL}/session`)
    .set('Authorization', `Bearer ${token}`)
    .send(roomData)
    .then(response => {
      const { roomName, polls } = response.body;
      store.dispatch(addSavedRoomAction({ roomName, polls }));
    })
    .catch(console.log);
