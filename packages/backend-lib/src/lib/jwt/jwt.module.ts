import { Module } from '@nestjs/common';
import { JWTService } from './JWTService';

// @Global()
@Module({
    providers:[
        JWTService
    ],
    exports:[
        JWTService
    ]
})
export class JwtModule {}
