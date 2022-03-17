import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    singup(@Body() dto: AuthDto) {
        console.log({
            dto
        })
        return this.authService.singup(dto)
    }

    // /auth/singin
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    singin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}