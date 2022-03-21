import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    // GET /users/me
    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string) {
        return user
    }

    @Patch()
    editUSer(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto)
    }
}
