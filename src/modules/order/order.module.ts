import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderAdminController } from './controller/admin-order.controller';

@Module({
  providers: [OrderService],
  controllers: [OrderAdminController]
})
export class OrderModule {}
