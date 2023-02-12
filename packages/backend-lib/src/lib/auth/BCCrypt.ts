import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class BCCrypt{
    constructor(
        private configService: ConfigService
    ){}
    async generateHash(hashingData: string){
        const salt = await bcrypt.genSalt(Number(this.configService.get<string>("SALT_NUM")));
        return bcrypt.hash(hashingData, salt);
    }

    async compare(passwordFromDb: string, inputPassword: string): Promise<boolean>{
        
        return bcrypt.compare(inputPassword, passwordFromDb);
    }

}