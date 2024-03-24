import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AutJwthGuard } from '@src/modules/auth/guard/auth.guard';
import { RoleGuard } from '@src/modules/auth/guard/role.guard';

export function Auth({
    roles = [],
    operationId
}): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            operationId
        }),
        UseGuards(AutJwthGuard, RoleGuard),
        SetMetadata('roles', roles),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),

    )
}