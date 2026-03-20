import { UrlStats } from "../entities/url-stats.entity.js";

export const URL_STATS_REPOSITORY = Symbol("URL_STATS_REPOSITORY");

export interface UrlStatsRepository {
  findByShortUrlId(shortUrlId: string): Promise<UrlStats | null>;
  incrementAccessCount(shortUrlId: string): Promise<UrlStats>;
}
