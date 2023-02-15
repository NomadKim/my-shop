import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InitApp } from '../database/Init';
import { CheckTheRole } from '../decorators/CheckTheRole';
import { PublicDecor } from '../decorators/PublicDecor';
import { AdminService } from './AdminService';

@Controller('admin')
@ApiTags('admin page')
export class AdminController {
  constructor(private adminService: AdminService, private init: InitApp) {}

  //Users Control

  @ApiResponse({ status: 201, description: 'All registered users' })
  @Get('users')
  async getAllUsers() {
    return await this.adminService.getAllUsers().catch(() => {
      throw new HttpException('Something Wrong', HttpStatus.NO_CONTENT);
    });
  }

  // @CheckTheRole()
  @PublicDecor()
  @ApiResponse({ status: 201, description: 'Delete user with id' })
  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.adminService.deleteUser(id).catch(() => {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return 'User ' + user.email + ' is deleted';
  }

  @CheckTheRole()
  @Patch(':id')
  async changeRoleOfUser(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.chageRoleOfUser(id);
  }

  @Get('init')
  @PublicDecor()
  async initApp() {
    return await this.init.initProducts();
  }
}
