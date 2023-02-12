import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseClient } from "../database/database-client";
import { OrderDto } from "./dto";

@Injectable()
export class OrderRepository {

    constructor(
        private dataClient: DatabaseClient
    ) { }

    async getOrdersByUser(userId: number) {
        return await this.dataClient.orders.findMany({
            where: {
                userId: userId
            }
        }).catch(() => {
            throw new HttpException("Something wrong with server", HttpStatus.SERVICE_UNAVAILABLE);
        })
    }

    async getOrderById(orderId: number) {
        return await this.dataClient.orders.findUnique({
            where: {
                id: orderId
            }
        });
    }

    async createOrder(order: OrderDto) {
        const proArr = order.productsQuantity.flatMap((element) => {
            return {
                product: {
                    connect: {
                        id: element.productId
                    }
                },
                quantityOfProduct: element.quantity,
                zakazano: false,
                magazin: "",
                otpravleno: false,
                dostavleno: false
            }
        });
        return await this.dataClient.orders.create({
            data: {
                userId: order.userId,
                sum: order.sum,
                products: {
                    create: proArr
                }
            }
        });
    }

    async getAllOrders() {
        return await this.dataClient.orders.findMany();
    }

}