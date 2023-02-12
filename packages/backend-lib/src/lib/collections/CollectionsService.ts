import { Injectable } from "@nestjs/common";
import { CollectionsRepository } from "./CollectionsRepository";
import { ColletionDTO } from "./dtos";

@Injectable()
export class CollectionService{
    constructor(
        private collectionsRepo: CollectionsRepository
    ){}

    async getAllCollections() {
        return await this.collectionsRepo.getAllCollections();
    }

    async createCollection(collectionsDto: ColletionDTO) {
        return await this.collectionsRepo.createCollection(collectionsDto);
    }

    async getAllProductsByCollection(id: number) {
        return await this.collectionsRepo.getAllProductsById(id);
    }

    async addProductsToCollection(id: number, products: number[]) {
        return await this.collectionsRepo.addProductsToCollection(id, products);
    }

    async deleProductsFromCollection(id: number, products: number[]) {
        return await this.collectionsRepo.deleteProductsFromCollection(id, products);
    }
}