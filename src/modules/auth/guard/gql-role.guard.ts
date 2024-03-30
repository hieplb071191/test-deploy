import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserError } from "@src/modules/user/constant/error.user.constant";

@Injectable()
export class GqlRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user
        const { role } = user
        if (!roles?.length) {
            return true
        }
        if (!roles.includes(role)) {
            throw new ForbiddenException(UserError.USER_FORBIDDEN_ACCESS_RESOURCE)
        }

        return true;
    }
}