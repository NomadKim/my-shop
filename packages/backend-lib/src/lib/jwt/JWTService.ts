import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jsonwebtoken from "jsonwebtoken";
import { UserDTO } from "../auth/dtos";


@Injectable()
export class JWTService {

    constructor(
        private configs: ConfigService,
    ) { }

    private key = this.configs.get<string>("SECRET_KEY_JWT");

    createJWT(user: UserDTO) {
        return jsonwebtoken.sign(user, this.key, { expiresIn: "300h" });
    }

    jwtverify(token: string) {
        const jwt = token.substring(7);
        return jsonwebtoken.verify(jwt, this.configs.get<string>("SECRET_KEY_JWT"));
    }
}