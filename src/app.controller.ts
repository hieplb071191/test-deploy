import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/common/decorators/auth.decorator';
import { User } from './common/decorators/user.decorator';
import { Response } from 'express';
import { HealthCheckService, MongooseHealthIndicator,HealthCheckResult} from '@nestjs/terminus'

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthCheck: HealthCheckService,
    private readonly mongoCheck: MongooseHealthIndicator,
  ) {}

  
  @ApiOperation({
    operationId: 'health-check'
  })
  @Get('/health-check')
  getHello(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      () => this.mongoCheck.pingCheck('mongo', { timeout: 3000 })
    ])
  }
}
