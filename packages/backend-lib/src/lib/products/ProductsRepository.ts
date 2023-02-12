import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/database-client';
import { ProductDTO } from './dtos';

@Injectable()
export class ProductsRepository {

    constructor(
        private dataClient: DatabaseClient
    ) { }

    async createProduct(product: ProductDTO, collctions) {
        try {
            return await this.dataClient.product.create({
                data: {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    collections: {
                        connect: collctions
                    }
                }
            });
        } catch {
            return undefined;
        }
    }

    async deleteProduct(id: number) {
        try {
            return await this.dataClient.product.delete({
                where: {
                    id: id,
                }
            });
        } catch {
            return undefined;
        }

    }

    async updateProduct(id: number, product: ProductDTO) {
        return await this.dataClient.product.update({
            where: {
                id: id
            },
            data: {
                name: product.name,
                price: product.price,
                description: product.description
            }
        });
    }

    async getAllProducts() {
        return await this.dataClient.product.findMany();
    }


    async getProductById(id: number) {
        return await this.dataClient.product.findUnique({
            where: {
                id: id
            }
        });
    }
}
