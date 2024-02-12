import { Expose } from 'class-transformer';

export class TokenPayloadRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;
}
