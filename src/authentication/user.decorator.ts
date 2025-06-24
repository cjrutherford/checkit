import { createParamDecorator, Inject } from "@nestjs/common"
import { TokenEntity, UserEntity } from "../database/entities";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

const User = createParamDecorator(
    (data: unknown, ctx) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as UserEntity;
    }
)

export default User;