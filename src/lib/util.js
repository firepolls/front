export const log = (...args) =>
  (process.env.NODE_ENV === 'debug' ? console.log(...args) : undefined);

export const capitalizer = (str) => 
  (str[0].toUpperCase() + str.slice(1));
