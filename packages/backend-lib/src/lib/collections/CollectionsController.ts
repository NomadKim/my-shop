import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CheckTheRole } from "../decorators/CheckTheRole";
import { CollectionService } from "./CollectionsService";
import { ColletionDTO } from "./dtos";

@Controller("collections")
@ApiTags("Collections controller")
export class CollectionsController {

    constructor(
        private collectionService: CollectionService
    ) { }

    @Get()
    async getAllCollections() {
        return await this.collectionService.getAllCollections().catch(() => {
            throw new HttpException("Something wrong", HttpStatus.SERVICE_UNAVAILABLE);
        });
    }

    @CheckTheRole()
    @Post()
    async createCollection(@Body() collectionDto: ColletionDTO) {
        const collection = await this.collectionService.createCollection(collectionDto).catch(() => {
            throw new HttpException("Something wrong", HttpStatus.SERVICE_UNAVAILABLE);
        });
        if (!collection) {
            throw new HttpException("No saved", HttpStatus.SERVICE_UNAVAILABLE);
        }

        return collection;
    }

    @Get(":id")
    async getAllProductsByCollections(@Param("id", ParseIntPipe) id: number) {
        return await this.collectionService.getAllProductsByCollection(id).catch(() => {
            throw new HttpException("Something wrong", HttpStatus.SERVICE_UNAVAILABLE);
        });
    }

    @CheckTheRole()
    @Patch(":id")
    async addProductsToCollection(@Param("id", ParseIntPipe) id: number, @Body() products: number[]) {
        return await this.collectionService.addProductsToCollection(id, products);
    }

    @CheckTheRole()
    @Patch("deleteProduct/:id")
    async deleProductsFromCollection(@Param("id", ParseIntPipe) id: number, @Body() products: number[]) {
        return this.collectionService.deleProductsFromCollection(id, products);
    }

}