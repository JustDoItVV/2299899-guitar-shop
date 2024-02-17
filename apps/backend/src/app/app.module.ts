import { BackendConfigModule } from "@guitar-shop/config";
import { BackendLoggerModule } from "@guitar-shop/logger";
import { Module } from "@nestjs/common";

import { GuitarModule } from "./guitar/guitar.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [BackendConfigModule, UserModule, GuitarModule, BackendLoggerModule],
})
export class AppModule {}
