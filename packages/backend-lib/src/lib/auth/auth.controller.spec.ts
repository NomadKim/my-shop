import { ConfigService } from "@nestjs/config";
import { BCCrypt } from "./BCCrypt";
import { UserRepository } from "./UserRepository";
import { DatabaseClient } from "../database/database-client";
import { JWTService } from "../jwt/JWTService";
import { AuthService } from "./AuthService";

describe("Auth test", ()=>{
    let cofigs = new ConfigService();
    let bccrypot = new BCCrypt(cofigs);
    let dataClient = new DatabaseClient(cofigs);
    let userRepo = new UserRepository(dataClient);
    let jwt = new JWTService(cofigs);
    let authService = new AuthService(userRepo, bccrypot, jwt);
    it("SignIn", async ()=>{
        let user = {
        email : "sdfaf111@g.com",
        password : "afaf"
    }
        console.log(user);
        let d = await authService.signUp(user);
        expect(d).not.toBe(undefined);
        let f = await authService.signUp(user);
        expect(f).toBe(undefined);
        
    });
});