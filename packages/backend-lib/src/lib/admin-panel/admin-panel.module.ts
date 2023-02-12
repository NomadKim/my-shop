import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './AdminController';
import { AdminService } from './AdminService';

@Module({
    controllers: [
        AdminController
    ],
    providers: [
        AdminService
    ],
    imports: [
        AuthModule
    ]
})
export class AdminPanelModule {

}
