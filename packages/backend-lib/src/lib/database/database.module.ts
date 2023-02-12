import { Global, Module } from '@nestjs/common';
import { DatabaseClient } from './database-client';
import { InitApp } from './Init';

@Global()
@Module({
  providers: [DatabaseClient,
  InitApp
],
  exports:[DatabaseClient,
   InitApp]
})
export class DatabaseModule {}
