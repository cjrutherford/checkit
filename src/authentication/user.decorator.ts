import { createParamDecorator } from "@nestjs/common"

export type UserType = { userId: string, email: string, iat: number, exp: number}
const User = createParamDecorator(
    async (data: unknown, ctx) => {
        const request = ctx.switchToHttp().getRequest();
        const token = (request.headers['authorization'] ?? request.headers['Authorization']).split(' ')[1];

        if (!token) {
            throw new Error("No token provided");
        }

        request.user = parseToken(token);

        return request.user;
    }
);

const parseToken = (token: string) => {
    // Assuming the token is a JWT token
    const payload = Buffer.from(token.split('.')[1], 'base64').toString('utf-8');
    return JSON.parse(payload);
};


export default User;