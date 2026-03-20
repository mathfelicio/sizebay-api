import { ShortUrl } from "../../domain/entities/short-url.entity.js";
import { ShortUrlOrmEntity } from "../entities/short-url-orm.entity";

export class ShortUrlMapper {
  static toPostgresEntity(shortUrl: ShortUrl): ShortUrlOrmEntity {
    const postgresEntity = new ShortUrlOrmEntity();

    if (shortUrl.id) {
      postgresEntity.id = shortUrl.id;
    }

    postgresEntity.code = shortUrl.code;
    postgresEntity.originalUrl = shortUrl.originalUrl;
    postgresEntity.shortUrl = shortUrl.shortUrl;
    postgresEntity.createdAt = shortUrl.createdAt;
    postgresEntity.updatedAt = shortUrl.updatedAt;

    return postgresEntity;
  }

  static toDomain(shortUrl: ShortUrlOrmEntity): ShortUrl {
    return ShortUrl.rehydrate({
      id: shortUrl.id ?? null,
      code: shortUrl.code,
      originalUrl: shortUrl.originalUrl,
      shortUrl: shortUrl.shortUrl,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
    });
  }
}
