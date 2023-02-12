import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { BCCrypt } from './BCCrypt';
import { UserRepository } from './UserRepository';

@Module({
    controllers:[
        AuthController
    ],
    providers: [
        AuthService,
        BCCrypt,
        UserRepository
    ],
    imports:[
        JwtModule
    ],
    exports:[
        UserRepository
    ]
})
export class AuthModule {}
