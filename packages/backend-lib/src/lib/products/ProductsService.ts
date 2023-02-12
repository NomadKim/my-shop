import { Injectable } from "@nestjs/common";
import { ProductDTO } from "./dtos";
import { ProductsRepository } from "./ProductsRepository";

@Injectable()
export class ProductsService{

    constructor(
        private productRepo: ProductsRepository
    ){}

    async getAllProducts() {
        return await this.productRepo.getAllProducts();
    }

    async createNewProduct(productDto: ProductDTO) {
        const arrColletions = [];
        if (productDto.collections) {
            for (let i = 0; i < productDto.collections.length; i++) {
                arrColletions.push({ id: productDto.collections[i] });
            }
        }
        return await this.productRepo.createProduct(productDto, arrColletions);
    }

    async deleteProductById(id: number) {
        return await this.productRepo.deleteProduct(id);
    }

    async updateProduct(id: number, product: ProductDTO) {
        return await this.productRepo.updateProduct(id, product);
    }

    async getProductById(id: number) {
        return await this.productRepo.getProductById(id)
    }

}