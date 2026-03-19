import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShortUrl } from "../../domain/entities/short-url.entity.js";
import { ShortUrlRepository } from "../../domain/repositories/short-url.repository.js";
import { ShortUrlEntity } from "../entities/short-url.entity.js";
import { ShortUrlMapper } from "../mappers/short-url.mapper.js";

@Injectable()
export class ShortUrlPostgresRepository implements ShortUrlRepository {
  constructor(
    @InjectRepository(ShortUrlEntity)
    private readonly repository: Repository<ShortUrlEntity>,
  ) {}

  async save(shortUrl: ShortUrl): Promise<ShortUrl> {
    const postgresEntity = ShortUrlMapper.toPostgresEntity(shortUrl);
    const savedShortUrl = await this.repository.save(postgresEntity);

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

  async findByOriginalUrl(originalUrl: string): Promise<ShortUrl | null> {
    const shortUrl = await this.repository.findOne({
      where: {
        originalUrl,
      },
    });

    return shortUrl ? ShortUrlMapper.toDomain(shortUrl) : null;
  }

  async delete(code: string): Promise<void> {
    await this.repository.delete({ code });
  }
}
