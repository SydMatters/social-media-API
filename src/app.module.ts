import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PostsModule } from './modules/posts/posts.module';
import { LikesModule } from './modules/likes/likes.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { MessagesModule } from './modules/messages/messages.module';
import { FollowersModule } from './modules/followers/followers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        /* JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(), */
        PORT: Joi.number(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Cambia esto a false en producción
      }),
    }),
    PostsModule,
    LikesModule,
    FavouritesModule,
    MessagesModule,
    FollowersModule,
    NotificationsModule,
  ],
  
})
export class AppModule {}
