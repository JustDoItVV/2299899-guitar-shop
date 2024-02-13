import 'multer';

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

type PhotoFile = Express.Multer.File;

@Injectable()
export class PhotoValidationPipe implements PipeTransform<PhotoFile, PhotoFile> {
  public allowedFormats: Record<string, string>;
  public message: string;

  constructor(allowedFormats: Record<string, string>, message: string) {
    this.allowedFormats = allowedFormats;
    this.message = message;
  }
  transform(value: PhotoFile): PhotoFile {
    const { originalname, mimetype } = value;
    const fileExtention = originalname.split('.').at(-1);

    if (!Object.keys(this.allowedFormats).includes(fileExtention)) {
      throw new BadRequestException(this.message);
    }

    if (this.allowedFormats[fileExtention] !== mimetype) {
      throw new BadRequestException(this.message);
    }

    return value;
  }
}
