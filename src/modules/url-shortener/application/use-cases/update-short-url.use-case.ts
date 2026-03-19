import { Inject, Injectable } from "@nestjs/common";
import {
  SHORT_URL_REPOSITORY,
  ShortUrlRepository,
} from "../../domain/repositories/short-url.repository.js";
import { ShortUrl } from "../../domain/entities/short-url.entity.js";
import { ShortUrlNotFoundException } from "../../domain/exceptions/short-url-not-found.exception.js";

@Injectable()
export class UpdateShortUrlUseCase {
  constructor(
    @Inject(SHORT_URL_REPOSITORY)
    private readonly shortUrlRepository: ShortUrlRepository,
  ) {}

  async execute(code: string, newUrl: string): Promise<ShortUrl> {
    const shortUrl = await this.shortUrlRepository.findByCode(code);

    if (!shortUrl) {
      throw new ShortUrlNotFoundException();
    }

    shortUrl.updateOriginalUrl(newUrl);

    return this.shortUrlRepository.save(shortUrl);
  }
}
