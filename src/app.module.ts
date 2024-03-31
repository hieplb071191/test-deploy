import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ProductModule } from './modules/product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LoggingPlugin } from './gql-plugin/logging.plugin';
import { AppResolver } from './app.resolver';
import { ApolloServerPluginLandingPageLocalDefault as pluginServer} from 'apollo-server-core';
import { CategoryModule } from './modules/category/category.module';
import { TerminusModule } from '@nestjs/terminus';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/gql/schema.gql'),
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UserModule, 
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ((config: ConfigService) => ({
        uri: config.get<string>('DB_URL')
      }))
    }),
    AuthModule,
    ProductModule,
    CategoryModule,
    TerminusModule,
    OrderModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, LoggingPlugin, AppResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}


