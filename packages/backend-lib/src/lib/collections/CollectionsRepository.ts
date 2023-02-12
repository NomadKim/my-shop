import { Injectable } from "@nestjs/common";
import { DatabaseClient } from "../database/database-client";
import { ColletionDTO } from "./dtos";

@Injectable()
export class CollectionsRepository {


    constructor(
        private databaseClient: DatabaseClient,
    ) { }


    async getAllCollections() {
        return await this.databaseClient.collections.findMany({
            include: {
                products: true
            }
        });
    }

    async createCollection(collectionsDto: ColletionDTO) {
        const arrOfProd = [];
        if (collectionsDto.products.length > 0) {
            for (let i = 0; i < collectionsDto.products.length; i++) {
                arrOfProd.push({ id: collectionsDto.products[i] });
            }
        }
        return await this.databaseClient.collections.create({
            data: {
                name: collectionsDto.name,
                products: {
                    connect: arrOfProd
                }

            }
        });
    }

    async getAllProductsById(id: number) {
        const collections = await this.databaseClient.collections.findUnique({
            where: {
                id: id,
            },
            include: {
                products: true
            }
        });

        return collections.products;
    }

    async addProductsToCollection(id: number, products) {
        const arr = [];
        for (const i in products["products"]) {
            arr.push({
                id: products.products[i]
            });
        }
        console.log(arr)
        return await this.databaseClient.collections.update({
            where: {
                id: id
            },
            data: {
                products: {
                    connect: arr
                }
            }
        });
    }

    async deleteProductsFromCollection(id: number, products) {
        const arr = [];
        for (const i in products["products"]) {
            arr.push({
                id: products.products[i]
            });
        }
        return await this.databaseClient.collections.update({
            where: {
                id: id
            },
            data: {
                products: {
                    disconnect: arr
                }
            }
        });
    }

}