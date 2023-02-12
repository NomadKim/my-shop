import { SetMetadata } from '@nestjs/common';

export const PublicDecor = ()=> {
    return SetMetadata("public", true)};