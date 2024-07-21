import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavouritesService } from '../service/favourite.service';
import { FavouritesDto } from '../dto/create-favourite.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Favourites') // Tags for API documentation
@Controller('favorites') // Base route for this controller
export class FavouritesController {
  constructor(private readonly FavouritesService: FavouritesService) {}

  @ApiResponse({
    status: 201,
    description: 'Favorite added.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('/add') // Route to add a favorite
  @UseGuards(JwtAuthGuard) // Protects route with JWT authentication guard
  public async addFavourite(@Body() body: FavouritesDto) {
    return await this.FavouritesService.addFavourite(body);
  }

  @ApiResponse({
    status: 200,
    description: 'Favorite deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Favorite not found.',
  })
  @Delete('/delete/:id') // Route to delete a favorite by ID
  @UseGuards(JwtAuthGuard) // Protects route with JWT authentication guard
  public async deleteFavourite(@Param('id') id: any) {
    return await this.FavouritesService.deleteFavourite(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all favourites.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Favourites not found.',
  })
  @Get('/user/:userId') // Route to get all favorites for a specific user
  @UseGuards(JwtAuthGuard) // Protects route with JWT authentication guard
  public async getFavourites(@Param('userId') userId: string) {
    return await this.FavouritesService.getFavourites(userId);
  }
}
