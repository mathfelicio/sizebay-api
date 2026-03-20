import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UrlStats } from "../../domain/entities/url-stats.entity.js";
import { UrlStatsRepository } from "../../domain/repositories/url-stats.repository.js";
import { UrlStatsOrmEntity } from "../entities/url-stats-orm.entity.js";

@Injectable()
export class UrlStatsPostgresRepository implements UrlStatsRepository {
  constructor(
    @InjectRepository(UrlStatsOrmEntity)
    private readonly repository: Repository<UrlStatsOrmEntity>,
  ) {}

  async findByShortUrlId(shortUrlId: string): Promise<UrlStats | null> {
    const stats = await this.repository.findOne({ where: { shortUrlId } });
    return stats ? this.toDomain(stats) : null;
  }

  async incrementAccessCount(shortUrlId: string): Promise<UrlStats> {
    let stats = await this.repository.findOne({ where: { shortUrlId } });

    if (!stats) {
      stats = this.repository.create({ shortUrlId, accessCount: 1 });
    } else {
      stats.accessCount += 1;
      stats.updatedAt = new Date();
    }

    const saved = await this.repository.save(stats);
    return this.toDomain(saved);
  }

  private toDomain(ormEntity: UrlStatsOrmEntity): UrlStats {
    return new UrlStats(
      ormEntity.id,
      ormEntity.shortUrlId,
      ormEntity.accessCount,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }
}
