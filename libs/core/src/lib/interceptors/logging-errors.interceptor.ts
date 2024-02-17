import { Observable, tap } from "rxjs";

import { BackendLoggerService } from "@guitar-shop/logger";
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

@Injectable()
export class LoggingErrorInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: BackendLoggerService) {}
  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    return next.handle().pipe(
      tap({
        error: (error: HttpException) => {
          if (Array.isArray(error["response"]["message"])) {
            error["response"]["message"].map((message) =>
              this.loggerService.error(message)
            );
          } else {
            this.loggerService.error(error.message);
          }
        },
      })
    );
  }
}
