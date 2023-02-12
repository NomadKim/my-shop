import { Module } from '@nestjs/common';
import { ProductsRepository } from './ProductsRepository';
import { ProductsController } from './ProductsController';
import { ProductsService } from './ProductsService';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository]
})
export class ProductsModule { }
