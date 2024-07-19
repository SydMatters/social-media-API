import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 200 })
  fullName: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true
  })
  gender?: Gender;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverImage?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  college?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  workPlace?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  personalWebSite?: string;

  @Column({ type: 'boolean', default: false })
  darkMode: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginDate?: Date;
}
