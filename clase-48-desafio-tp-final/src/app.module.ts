import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat/chat.gateway';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [ProductModule, ShoppingCartModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),
    AuthModule,
    UsersModule,
    OrderModule,
    MailModule,],
  controllers: [AppController],
  providers: [AppService,ChatGateway],
})
export class AppModule {}
