import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth({
    roles = [],
    operationId
}): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            operationId
        }),
        SetMetadata('roles', roles),
        UseGuards(),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),

    )
}