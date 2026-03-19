import { ShortUrl } from "../entities/short-url.entity.js";

export const SHORT_URL_REPOSITORY = Symbol("SHORT_URL_REPOSITORY");

export interface ShortUrlRepository {
  save(shortUrl: ShortUrl): Promise<ShortUrl>;
  findByCode(code: string): Promise<ShortUrl | null>;
}
