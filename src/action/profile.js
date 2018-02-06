import superagent from 'superagent';

export const setProfileAction = profile => ({
  type: 'PROFILE_SET',
  payload: profile,
});

export const createProfile = (profile) => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}/profiles`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-type', 'application/json')
    .send(profile)
    .then(response => {
      store.dispatch(setProfileAction(response.body));
    })
    .catch(console.log);
};
