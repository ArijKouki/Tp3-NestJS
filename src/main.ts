import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  //const myService= app.get()
  //await app.listen(3000);
}
bootstrap();
