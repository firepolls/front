export const cookieFetchAll = () => 
  Object.assign(...document.cookie.split(';')
    .map(cookie => {
      const [key, value] = cookie.split('=');
      return { [key.trim()]: value };
    })
  );

export const cookieDelete = key => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.firepolls.com`;
};

export const cookieFetch = key =>
  cookieFetchAll()[key];
