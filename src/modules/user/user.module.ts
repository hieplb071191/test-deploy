import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UserPublicController } from './controllers/user.public.controller';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './resolver/user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      }
    ])
  ],
  controllers: [UserPublicController],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService, UserRepository]
})
export class UserModule {}
