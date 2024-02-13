export enum TitleLength {
  Min = 10,
  Max = 100,
}

export enum DescriptionLength {
  Min = 20,
  Max = 1024,
}

export enum VendorCodelength {
  Min = 5,
  Max = 40,
}

export const GUITAR_STRINGS = [4, 6, 7, 12];
export const GUITAR_STRINGS_STRING = "[4, 6, 7, 12]";

export enum Price {
  Min = 100,
  Max = 1000,
}

export enum AllowedPhotoFormat {
  jpg = 'image/jpg',
  png = 'image/png',
}

export enum GuitarErrorMessage {
  FieldRequired = 'Required field',
  NotString = 'must be a string',
  Nan = 'must be a number',
  TitleRequired = 'Title required',
  TitleMinLength = `Title min length is ${TitleLength.Min} symbols`,
  TitleMaxLength = `Title max length is ${TitleLength.Max} symbols`,
  DescriptionRequired = 'Description required',
  DescriptionMinLength = `Description min length is ${DescriptionLength.Min} symbols`,
  DescriptionMaxLength = `Description max length is ${DescriptionLength.Max} symbols`,
  TypeRequired = 'Type required',
  VendorCodeRequired = 'Vendor code required',
  VendorCodeMinLength = `Vendor code min length is ${VendorCodelength.Min} symbols`,
  VendorCodeMaxLength = `Vendor code min length is ${VendorCodelength.Max} symbols`,
  GuitarStringsRequired = 'Guitar strings required',
  WrongGuitarStrings = `Guitar strings value must be one of ${GUITAR_STRINGS_STRING}`,
  PriceRequired = 'Price required',
  PriceMin = `Price min value is ${Price.Min}`,
  PriceMax = `Price max value is ${Price.Max}`,
  AlreadyExists = 'User with this email already exists',
  NotFound = 'Guitar with this id not found',
  PhotoWrongFormat = `File format not allowed. Allowed formats: ${AllowedPhotoFormat.jpg}, ${AllowedPhotoFormat.png}`,
}
