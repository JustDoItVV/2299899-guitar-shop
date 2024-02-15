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
}

export const SALT_ROUNDS = 10;
