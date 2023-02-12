import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDTO } from "@my-shop/dtos";
import { BCCrypt } from "./BCCrypt";
import { JWTService } from "../jwt/JWTService";
import { UserRepository } from "./UserRepository";

@Injectable()
export class AuthService {

    constructor(
        private userRepo: UserRepository,
        private bcrypt: BCCrypt,
        private JWT: JWTService
    ) { }

    async signIn(userdto: UserDTO) {
        const user = await this.userRepo.findUser(userdto.email);
        if (!user) {
            return {
                "error": "No such user"
            }
        }
        if (! await this.bcrypt.compare(user.password, userdto.password)) {
            throw new HttpException("wrong password", HttpStatus.BAD_REQUEST)
        }
        return  "Bearer " + await this.JWT.createJWT(userdto);
    }

    async signUp(userDto: UserDTO) {
        const hash = await this.bcrypt.generateHash(userDto.password);
        const user = await this.userRepo.createUser(userDto, hash);
        if (!user) {
            return undefined;
        }
        userDto.password = hash;
        const token = "Bearer " + this.JWT.createJWT(userDto);
        return token;
    }
}