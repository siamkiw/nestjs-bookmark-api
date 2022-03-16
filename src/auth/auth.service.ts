import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async singup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                select: {
                    email: true,
                    createAt: true,
                    updateAt: true
                }
            });
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    signin() {
        // find the user by email 
        // if user does not exist throw exception

        // compare password 
        // if password incorrect throw exception

        // send back the user 
        return {
            msg: "hello login"
        }
    }
}