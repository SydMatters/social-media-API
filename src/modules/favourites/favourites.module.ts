import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './service/favourite.service';
import { FavouritesController } from './controllers/favourirtes.controllers';
import { FavouritesEntity } from './entities/favourites.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavouritesEntity]), // Import TypeORM module for FavouritesEntity
    AuthModule, // Import AuthModule for authentication-related features
  ],
  controllers: [
    FavouritesController, // Register the controller responsible for handling HTTP requests related to favourites
  ],
  providers: [
    FavouritesService, // Register the service responsible for business logic related to favourites
  ],
  exports: [
    FavouritesService, // Export FavouritesService so it can be used in other modules
  ],
})
export class FavouritesModule {}
