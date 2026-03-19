import { ShortUrl } from "../../../domain/entities/short-url.entity.js";

export class ShortUrlPresenter {
  static toHttp(shortUrl: ShortUrl) {
    return {
      code: shortUrl.code,
      createdAt: shortUrl.createdAt,
      originalUrl: shortUrl.originalUrl,
      shortUrl: shortUrl.shortUrl,
    };
  }
}
