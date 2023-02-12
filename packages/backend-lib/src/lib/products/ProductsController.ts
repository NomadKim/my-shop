import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CheckTheRole } from "../decorators/CheckTheRole";
import { ProductDTO } from "./dtos";
import { ProductsService } from "./ProductsService";

@Controller("products")
@ApiTags("Products Controller")
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ) { }

    @Get()
    async getAllProducts() {
        return await this.productsService.getAllProducts().catch(() => {
            throw new HttpException("Somethig wrong, try again later", HttpStatus.BAD_GATEWAY);
        });
    }

    @Get(":id")
    async getProductById(@Param("id", ParseIntPipe) id: number) {
        return await this.productsService.getProductById(id).catch(() => {
            throw new HttpException("Somethig wrong, try again later", HttpStatus.BAD_GATEWAY);
        });
    }

    @CheckTheRole()
    @Post()
    async createNewProduct(@Body() productDto: ProductDTO) {
        const product = await this.productsService.createNewProduct(productDto).catch(() => {
            throw new HttpException("Something Wrong", HttpStatus.SERVICE_UNAVAILABLE);
        });
        if (!product) {
            throw new HttpException("Try again", HttpStatus.SERVICE_UNAVAILABLE);
        }
        return product;

    }

    @CheckTheRole()
    @Delete(":id")
    async deleteProductById(@Param('id', ParseIntPipe) id: number) {
        const product = await this.productsService.deleteProductById(id).catch(() => {
            throw new HttpException("product not found", HttpStatus.BAD_REQUEST)
        });
        if (!product) {
            throw new HttpException("product not found", HttpStatus.BAD_REQUEST);
        }
        return product;
    }

    @CheckTheRole()
    @Patch(":id")
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() product: ProductDTO) {

        const productDb = await this.productsService.updateProduct(id, product);
        if (!productDb) {
            throw new HttpException("No such product", HttpStatus.SERVICE_UNAVAILABLE);

        }
        return productDb;
    }
}