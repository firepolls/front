export const log = (...args) =>
  (process.env.NODE_ENV === 'debug' ? console.log(...args) : undefined);
