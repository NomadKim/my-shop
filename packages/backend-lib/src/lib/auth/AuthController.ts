import { Body, Controller, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./AuthService";
import { UserDTO } from "@my-shop/dtos";
import { Response } from "express";
import { PublicDecor } from "../decorators/PublicDecor";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("auth controller")
@ApiResponse({ status: 401, description: "Wrong password or email" })
@ApiResponse({ status: 201, description: "Success" })
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post("/signin")
    @PublicDecor()
    @ApiResponse({ status: 401, description: "Wrong password or email" })
    @ApiResponse({ status: 201, description: "Success" })
    async signIn(@Body() userdto: UserDTO, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.signIn(userdto);
        if (typeof token === "string") {
            res.set("Authorization", token);
            return {
                "sign in": "success"
            };
        } else {
            throw new HttpException("Wrong credentials", HttpStatus.UNAUTHORIZED)
        }

    }

    @Post("signup")
    @PublicDecor()
    @ApiResponse({ status: 401, description: "Wrong password or email" })
    @ApiResponse({ status: 201, description: "Success" })
    @ApiResponse({ status: 503, description: "Server error" })
    async signUp(@Body() userDTO: UserDTO, @Res({ passthrough: true }) res: Response) {
        const jwt = await this.authService.signUp(userDTO);
        if (jwt === undefined) {
            throw new HttpException("Something gone wrong", HttpStatus.SERVICE_UNAVAILABLE);
        }

        res.set("Authorization", jwt);
        return { "signUp": "Success" };
    }
}