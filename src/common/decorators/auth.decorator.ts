import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AutJwthGuard } from '@src/modules/auth/guard/auth.guard';

export function Auth({
    roles = [],
    operationId
}): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            operationId
        }),
        SetMetadata('roles', roles),
        UseGuards(AutJwthGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),

    )
}