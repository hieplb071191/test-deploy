import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order-admin')
@Controller('order-admin')
export class OrderAdminController {}
