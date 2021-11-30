import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return this.repository.createQueryBuilder("user").where("user.id = :id", { id: user_id }).getRawOne()
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.createQueryBuilder("user").orderBy("user.first_name", "ASC").getRawMany()
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.createQueryBuilder("user").where("LOWER(user.first_name) = LOWER(:first_name) AND LOWER(user.last_name) = LOWER(:last_name)", { first_name, last_name }).getRawMany();
  }
}
