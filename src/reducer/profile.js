export const validateProfile = profile => {
  if (!profile) {
    throw new Error('__ERROR__ profile is required!');
  }

  const {
    firstName,
    lastName,
    email,
    account_id,
  } = profile;

  if (!firstName || !lastName || !email || !account_id) {
    throw new Error('__ERROR__ invalid profile data');
  }
};

export default (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
