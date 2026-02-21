export const isRequired = (value) =>
  Boolean(value && value.trim().length > 0);

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const minLength = (value, length) =>
  Boolean(value && value.length >= length);