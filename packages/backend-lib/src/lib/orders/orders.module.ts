import { Module } from '@nestjs/common';
import { OrderRepository } from './OrderRepository';
import { OrdersController } from './OrdersController';
import { OrderService } from './OrderService';

@Module({
    controllers:[
        OrdersController
    ],
    providers:[
        OrderRepository,
        OrderService
    ]
})
export class OrdersModule {}
