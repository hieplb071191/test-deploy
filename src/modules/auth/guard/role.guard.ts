import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserError } from "@src/modules/user/constant/error.user.constant";
import { Observable } from "rxjs";

export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {
        this.reflector = new Reflector()
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[] | string>('roles', context.getHandler())
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        const { role } = request.user
        if (!roles.includes(role)) {
            throw new ForbiddenException(UserError.USER_FORBIDDEN_ACCESS_RESOURCE)
        }
        return true
    }
    
}