import { Module } from '@nestjs/common';
import { CollectionsController } from './CollectionsController';
import { CollectionsRepository } from './CollectionsRepository';
import { CollectionService } from './CollectionsService';

@Module({
    controllers: [CollectionsController],
    providers: [
        CollectionService,
        CollectionsRepository
    ]
})
export class CollectionsModule {}
