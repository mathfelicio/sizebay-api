import { ObjectId } from "mongodb";
import { ShortUrl } from "../../domain/entities/short-url.entity.js";
import { ShortUrlMongoEntity } from "../entities/short-url.mongoEntity.js";

export class ShortUrlMapper {
  static toMongoEntity(shortUrl: ShortUrl): ShortUrlMongoEntity {
    const mongoEntity = new ShortUrlMongoEntity();

    if (shortUrl.id) {
      mongoEntity._id = new ObjectId(shortUrl.id);
    }

    mongoEntity.code = shortUrl.code;
    mongoEntity.originalUrl = shortUrl.originalUrl;
    mongoEntity.shortUrl = shortUrl.shortUrl;
    mongoEntity.createdAt = shortUrl.createdAt;

    return mongoEntity;
  }

  static toDomain(shortUrl: ShortUrlMongoEntity): ShortUrl {
    return ShortUrl.rehydrate({
      id: shortUrl._id?.toHexString() ?? null,
      code: shortUrl.code,
      originalUrl: shortUrl.originalUrl,
      shortUrl: shortUrl.shortUrl,
      createdAt: shortUrl.createdAt,
    });
  }
}
