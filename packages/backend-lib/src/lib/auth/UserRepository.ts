import { Injectable } from "@nestjs/common";
import { DatabaseClient } from "../database/database-client";
import { UserDTO } from "./dtos";

@Injectable()
export class UserRepository {

    constructor(
        private dataClient: DatabaseClient
    ) { }

    async createUser(user: UserDTO, hashPassword: string) {
        try {
            return await this.dataClient.user.create({
                data: {
                    email: user.email,
                    password: hashPassword,
                    role: {
                        connect: { id: 1 }
                    }
                }
            })
        } catch (error) {
            return undefined;
        }
    }

    async findUser(userEmail: string) {
        return this.dataClient.user.findUnique({
            where: {
                email: userEmail
            }
        });
    }

    async getAllUsers() {
        return await this.dataClient.user.findMany({
            select: {
                email: true
            }
        });
    }

    async deleteUser(id: number) {
        try {
            return await this.dataClient.user.delete({
                where: {
                    id: id
                }
            });
        } catch {
            return undefined;
        }

    }

    async changeRoleOfUser(id: number) {
        return await this.dataClient.user.update({
            where: {
                id: id
            },
            data: {
                roleId : 2
            }
        });
    }

}