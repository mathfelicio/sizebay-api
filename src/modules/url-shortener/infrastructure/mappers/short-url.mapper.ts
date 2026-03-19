import { ShortUrl } from "../../domain/entities/short-url.entity.js";
import { ShortUrlEntity } from "../entities/short-url.entity.js";

export class ShortUrlMapper {
  static toPostgresEntity(shortUrl: ShortUrl): ShortUrlEntity {
    const postgresEntity = new ShortUrlEntity();

    if (shortUrl.id) {
      postgresEntity.id = shortUrl.id;
    }

    postgresEntity.code = shortUrl.code;
    postgresEntity.originalUrl = shortUrl.originalUrl;
    postgresEntity.shortUrl = shortUrl.shortUrl;
    postgresEntity.createdAt = shortUrl.createdAt;

    return postgresEntity;
  }

  static toDomain(shortUrl: ShortUrlEntity): ShortUrl {
    return ShortUrl.rehydrate({
      id: shortUrl.id ?? null,
      code: shortUrl.code,
      originalUrl: shortUrl.originalUrl,
      shortUrl: shortUrl.shortUrl,
      createdAt: shortUrl.createdAt,
    });
  }
}
