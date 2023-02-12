import { Injectable } from "@nestjs/common";
import { OrderDto } from "./dto";
import { OrderRepository } from "./OrderRepository";

@Injectable()
export class OrderService {

    constructor(
        private orderRepo: OrderRepository
    ) { }

    async getOrderById(orderId: number) {
        return await this.orderRepo.getOrderById(orderId);
    }
    
    async getOrdersByUser(userId: number) {
        return await this.orderRepo.getOrdersByUser(userId);
    }

    async createOrderByUser(order: OrderDto) {
        return await this.orderRepo.createOrder(order);
    }

    async getAllOrders() {
        return await this.orderRepo.getAllOrders();
    }
}