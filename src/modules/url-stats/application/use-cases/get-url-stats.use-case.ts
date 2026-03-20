import { Inject, Injectable } from "@nestjs/common";
import {
  SHORT_URL_REPOSITORY,
  ShortUrlRepository,
} from "../../../url-shortener/domain/repositories/short-url.repository.js";
import {
  URL_STATS_REPOSITORY,
  UrlStatsRepository,
} from "../../domain/repositories/url-stats.repository.js";
import { ShortUrlNotFoundException } from "../../../url-shortener/domain/exceptions/short-url-not-found.exception.js";

@Injectable()
export class GetUrlStatsUseCase {
  constructor(
    @Inject(SHORT_URL_REPOSITORY)
    private readonly shortUrlRepository: ShortUrlRepository,
    @Inject(URL_STATS_REPOSITORY)
    private readonly urlStatsRepository: UrlStatsRepository,
  ) {}

  async execute(code: string) {
    const shortUrl = await this.shortUrlRepository.findByCode(code);

    if (!shortUrl) {
      throw new ShortUrlNotFoundException();
    }

    const stats = await this.urlStatsRepository.findByShortUrlId(shortUrl.id!);

    return {
      id: shortUrl.id,
      url: shortUrl.originalUrl,
      shortCode: shortUrl.code,
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
      accessCount: stats?.accessCount ?? 0,
    };
  }
}
