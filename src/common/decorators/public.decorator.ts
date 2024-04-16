import { applyDecorators } from "@nestjs/common";
import { ApiBadGatewayResponse, ApiOperation } from "@nestjs/swagger";


export function Public(operationId): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            operationId
        }),
    )
}