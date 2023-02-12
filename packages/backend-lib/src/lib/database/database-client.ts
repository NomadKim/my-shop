import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseClient extends PrismaClient {
    constructor(
        private configs: ConfigService
    ) {
        super({
            datasources: {
                db: {
                    url: configs.get<string>("DATABASE_URL")
                }
            }
        });
    }
}
