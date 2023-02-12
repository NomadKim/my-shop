import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CheckTheRole } from "../decorators/CheckTheRole";
import { OrderDto } from "./dto";
import { OrderService } from "./OrderService";

@Controller("orders")
@ApiTags("Order controller")
export class OrdersController {

    constructor(
        private orderService: OrderService
    ) { }

    @CheckTheRole()
    @Get()
    async getAllOrders() {
        return await this.orderService.getAllOrders();
    }

    @Get(":userId")
    async getOrdersByUser(@Param("userId", ParseIntPipe) userId: number) {
        return await this.orderService.getOrdersByUser(userId);
    }

    @Post()
    async createOrderByUser(order: OrderDto) {
        return await this.orderService.createOrderByUser(order);
    }

    @Get(":orderId")
    async getOrderById(@Param("orderId", ParseIntPipe) orderId: number) {
        return await this.orderService.getOrderById(orderId);
    }

    @CheckTheRole()
    @Put(":orderId")
    async updateOrder(@Body() order: OrderDto, @Param("orderId", ParseIntPipe) orderId: number) {
        return await this.orderService.getOrderById(orderId);
    }
}