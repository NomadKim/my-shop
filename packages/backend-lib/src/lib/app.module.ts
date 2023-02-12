import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/AuthGuard';
import { JwtModule } from './jwt/jwt.module';
import { CollectionsModule } from './collections/collections.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule,
    DatabaseModule,
    AuthModule,
    OrdersModule,
    AdminPanelModule,
    CollectionsModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule { }
