import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/common/decorators/auth.decorator';
import { User } from './common/decorators/user.decorator';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Auth({
    roles: ['admin','user'],
    operationId: 'hello'
  })
  @Get('/hello')
  getHello(@User() user: any): string {
    return user;
  }
}
