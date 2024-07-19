import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/create-user.dto';
import * as bycryptjs from 'bcryptjs';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';
import { catchError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: UserDto) {
    try {
      const userEmail = this.userRepository.findOne({ where: { email: userDto.email } })
      const userName = this.userRepository.findOne({ where: { username: userDto.username } })
      if (userEmail || userName) {
        return;
      }

      userDto.password = await bycryptjs.hash(userDto.password, 20);

      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

 async getUsers () {
   try {
     return await this.userRepository.find()
   } catch (error) {
     console.log(error)
   }
 }

  async getUserById (userId: string) {
    try {
      return await this.userRepository.findOne({ where: { id: userId } })
    } catch (error) {
      console.log(error)
    }
  }

  async getUserByUserName (userName: string) {
    try {
      return await this.userRepository.findOne({ where: { username: userName } })
    } catch (error) {
      console.log(error)
    }
  }

  async getByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email: email } })
    } catch (error) {
      console.log(error)
    }
  }

  async modifyProfile(userDto: UserDto) {
    try {
      const user = this.userRepository.create(userDto)
      return await this.userRepository.save(user)
    } catch (error) {
      console.log(error)
    }
  }
  
  async setDarkMode(userDto: UserDto) {
    try {
      userDto.darkMode = !userDto.darkMode
      await this.userRepository.update({ id: userDto.id }, { darkMode: userDto.darkMode });
    } catch (error) {
      console.log(error)
    }
  }
  
  async deleteUser(id: string) {
    try {
      return await this.userRepository.delete(id)
    } catch (error) {
      console.log(error)
    }
  }
};