import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Auth({
    roles: [],
    operationId: 'hello'
  })
  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
