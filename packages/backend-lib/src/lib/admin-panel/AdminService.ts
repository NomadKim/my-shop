import { Injectable } from '@nestjs/common';
import { UserRepository } from '../auth/UserRepository';

@Injectable()
export class AdminService {
    


    constructor(
        private userRepo: UserRepository,
    ) { }

    async getAllUsers() {
        return await this.userRepo.getAllUsers();
    }

    async deleteUser(id: number) {
        return await this.userRepo.deleteUser(id);
    }
    
    async chageRoleOfUser(id: number) {
        return await this.userRepo.changeRoleOfUser(id);
    }

}
