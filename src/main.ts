import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import initSwagger from './common/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['*', 'http://localhost:3000', 'https://lehiep-dev.xyz']
  });
  app.use(helmet());
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  initSwagger(app)
  await app.listen(process.env.PORT).then( () => {
    console.log(`app listen on port ${process.env.PORT}`)
  });
}
bootstrap();
