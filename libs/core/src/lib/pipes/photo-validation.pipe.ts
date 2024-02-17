import "multer";

import {
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
} from "@nestjs/common";

type PhotoFile = Express.Multer.File;

@Injectable()
export class PhotoValidationPipe
  implements PipeTransform<PhotoFile, PhotoFile>
{
  public allowedFormats: Record<string, string>;
  public message: string;

  constructor(allowedFormats: Record<string, string>, message: string) {
    this.allowedFormats = allowedFormats;
    this.message = message;
  }
  transform(value: PhotoFile): PhotoFile {
    if (value) {
      const { originalname, mimetype } = value;
      const fileExtention = originalname.split(".").at(-1);

      const isValidFormatCondition1 = Object.keys(this.allowedFormats).includes(
        fileExtention
      );
      const isValidFormatCondition2 =
        this.allowedFormats[fileExtention] === mimetype;

      if (!isValidFormatCondition1 || !isValidFormatCondition2) {
        throw new UnsupportedMediaTypeException(this.message);
      }
    }

    return value;
  }
}
