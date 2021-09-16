import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  // controllers: [AppController, ProductsController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
