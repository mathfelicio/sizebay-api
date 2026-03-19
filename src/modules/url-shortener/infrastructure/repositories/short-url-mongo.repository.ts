import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { ShortUrl } from "../../domain/entities/short-url.entity.js";
import { ShortUrlRepository } from "../../domain/repositories/short-url.repository.js";
import { ShortUrlMongoEntity } from "../entities/short-url.mongoEntity.js";
import { ShortUrlMapper } from "../mappers/short-url.mapper.js";

@Injectable()
export class ShortUrlMongoRepository implements ShortUrlRepository {
  constructor(
    @InjectRepository(ShortUrlMongoEntity, "mongodb")
    private readonly repository: MongoRepository<ShortUrlMongoEntity>,
  ) {}

  async save(shortUrl: ShortUrl): Promise<ShortUrl> {
    const mongoEntity = ShortUrlMapper.toMongoEntity(shortUrl);
    const savedShortUrl = await this.repository.save(mongoEntity);

    return ShortUrlMapper.toDomain(savedShortUrl);
  }

  async findByCode(code: string): Promise<ShortUrl | null> {
    const shortUrl = await this.repository.findOne({
      where: {
        code,
      },
    });

    return shortUrl ? ShortUrlMapper.toDomain(shortUrl) : null;
  }
}
