import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FavouritesEntity } from '../entities/favourites.entity';
import { FavouritesDto } from '../dto/create-favourite.dto';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavouritesEntity)
    private readonly favouritesRepository: Repository<FavouritesEntity>
  ) { }

  /**
   * Add a new favourite.
   * @param FavouritesDto - Data transfer object for the favourite.
   * @returns The created FavouritesEntity.
   */
  public async addFavourite(FavouritesDto: FavouritesDto): Promise<FavouritesEntity> {
    try {
      const favourite = this.favouritesRepository.create(FavouritesDto);
      return await this.favouritesRepository.save(favourite);
    } catch (error) {
      throw new Error(error.message); // Include .message for more detailed error info
    }
  }

  /**
   * Delete a favourite by ID.
   * @param id - The ID of the favourite to delete.
   * @returns The result of the delete operation.
   */
  public async deleteFavourite(id: string): Promise<DeleteResult | undefined> {
    try {
      const result = await this.favouritesRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('Favourite not found');
      }
      return result;
    } catch (error) {
      throw new Error(error.message); // Include .message for more detailed error info
    }
  }

  /**
   * Get all favourites for a given user.
   * @param userId - The ID of the user whose favourites to retrieve.
   * @returns An array of FavouritesEntity.
   */
  async getFavourites(userId: string): Promise<FavouritesEntity[]> {
    try {
      const favourites = await this.favouritesRepository.find({ where: { userId } });
      if (favourites.length === 0) {
        throw new Error('Favourites not found');
      }
      return favourites;
    } catch (error) {
      throw new Error(error.message); // Include .message for more detailed error info
    }
  }
}
