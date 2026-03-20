import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ShortUrlAccessedEvent } from "../../../url-shortener/domain/events/short-url-accessed.event.js";
import {
  URL_STATS_REPOSITORY,
  UrlStatsRepository,
} from "../../domain/repositories/url-stats.repository.js";

@EventsHandler(ShortUrlAccessedEvent)
export class ShortUrlAccessedHandler implements IEventHandler<ShortUrlAccessedEvent> {
  constructor(
    @Inject(URL_STATS_REPOSITORY)
    private readonly urlStatsRepository: UrlStatsRepository,
  ) {}

  async handle(event: ShortUrlAccessedEvent): Promise<void> {
    await this.urlStatsRepository.incrementAccessCount(event.shortUrlId);
  }
}
