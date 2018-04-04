export const log = (...args) =>
  (process.env.NODE_ENV !== 'production' ? console.log(...args) : undefined);

export const capitalizer = (str) => 
  (str[0].toUpperCase() + str.slice(1));

export const curry = (fn, ...binds) =>
  (...args) => fn(...binds, ...args);
