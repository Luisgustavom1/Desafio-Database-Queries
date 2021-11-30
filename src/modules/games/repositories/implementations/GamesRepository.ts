import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('game')
      .where('game.title ILIKE :title', { title: `%${param}%` })
      .getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return [{ count: (await this.repository.createQueryBuilder('game').getRawMany()).length.toString() }]; // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
    .createQueryBuilder('game')
    .leftJoinAndSelect('game.users', 'user')
    .andWhere('game.id = :id', { id })
    .getOne()
    
    if (!game) {
      throw new Error("Game does not exists!")
    }

    return game?.users
    // Complete usando query builder
  }
}
