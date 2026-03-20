import { Inject, Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import {
  SHORT_URL_REPOSITORY,
  ShortUrlRepository,
} from "../../domain/repositories/short-url.repository.js";
import { ShortUrlNotFoundException } from "../../domain/exceptions/short-url-not-found.exception.js";
import { ShortUrlAccessedEvent } from "../../domain/events/short-url-accessed.event.js";

@Injectable()
export class GetShortUrlUseCase {
  constructor(
    @Inject(SHORT_URL_REPOSITORY)
    private readonly shortUrlRepository: ShortUrlRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(code: string) {
    const shortUrl = await this.shortUrlRepository.findByCode(code);

    if (!shortUrl) {
      throw new ShortUrlNotFoundException();
    }

    if (shortUrl.id) {
      this.eventBus.publish(
        new ShortUrlAccessedEvent(shortUrl.id, shortUrl.code),
      );
    }

    return shortUrl;
  }
}
