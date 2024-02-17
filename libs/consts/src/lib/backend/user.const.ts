export enum NameLength {
  Min = 1,
  Max = 15,
}

export enum PasswordLength {
  Min = 6,
  Max = 12,
}

export enum UserErrorMessage {
  NotString = 'must be a string',
  UserExists = 'User with this email already exists',
  TokenCreationError = 'Token creation error',
  TokenNotExist = "Token does't exist",
  EmailRequired = 'Email required',
  EmailNotValid = 'Email not valid',
  NameRequired = "User's name required",
  NameMinLength = `User name min length is ${NameLength.Min} symbols`,
  NameMaxLength = `User name max length is ${NameLength.Max} symbols`,
  PasswordRequired = 'Password required',
  PasswordMinLength = `Password min length is ${PasswordLength.Min} symbols`,
  PasswordMaxLength = `Password max length is ${PasswordLength.Max} symbols`,
  PasswordWrong = 'Wrong password',
  NotFound = 'User with this email not found',
  OnlyAnonymous = 'Forbidden. Allowed only for unauthorized',
}

export const SALT_ROUNDS = 10;

export enum ApiUserMessage {
  UserCreated = 'New user created',
  UserAlreadyExists = 'User already exists conflict',
  UserCreationValidationError = 'User creation validation error',
  LoginSuccess = 'Login successfully',
  LoginValidationError = 'Login validation error',
  LoginNotFound = 'Email not found',
  LoginWrongPassword = 'Wrong password',
  RefreshTokenSuccess = 'Refresh token success',
  RefreshTokenError = 'Refresh token error, unauthorized',
  UserRead = 'Users read',
  UserNotFound = 'User not found',
  CheckUser = 'Check user token',
  Unauthorized = 'Unauthorized',
}

export const API_REFRESH_HEADER = {
  name: 'Authorization',
  description: 'Refresh JWT token',
  required: true,
};
