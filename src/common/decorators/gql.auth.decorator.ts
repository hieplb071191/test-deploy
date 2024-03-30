import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { GqlAuthGuard } from "@src/modules/auth/guard/gql-auth.guard";
import { GqlRolesGuard } from "@src/modules/auth/guard/gql-role.guard";

export function GqlAuth(...roles): MethodDecorator {
    return applyDecorators(
        UseGuards(GqlAuthGuard, GqlRolesGuard),
        SetMetadata('roles', roles)
    )
}