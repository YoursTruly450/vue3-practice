const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'User with this email not found',
  INVALID_LOGIN_CREDENTIALS: 'Invalid login or password',
  AUTHORIZATION: 'Authorization is necessary',
};

export const errorDict = (code) => {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Unknown error';
};