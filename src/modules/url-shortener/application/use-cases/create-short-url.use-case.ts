import { Inject, Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import {
  SHORT_URL_REPOSITORY,
  ShortUrlRepository,
} from "../../domain/repositories/short-url.repository.js";
import { ShortUrl } from "../../domain/entities/short-url.entity.js";
import { ShortUrlBuilder } from "../builders/short-url.builder.js";
import { ShortUrlCodeCreateException } from "../../domain/exceptions/short-url-code-create.exception.js";

@Injectable()
export class CreateShortUrlUseCase {
  constructor(
    @Inject(SHORT_URL_REPOSITORY)
    private readonly shortUrlRepository: ShortUrlRepository,
    private readonly shortUrlBuilder: ShortUrlBuilder,
  ) { }

  async execute(originalUrl: string): Promise<ShortUrl> {
    const existingShortUrl = await this.shortUrlRepository.findByOriginalUrl(originalUrl);

    if (existingShortUrl) {
      return existingShortUrl;
    }

    const code = randomBytes(6).toString("base64url");

    try {
      const shortUrl = ShortUrl.create({
        code,
        originalUrl,
        shortUrl: this.shortUrlBuilder.build(code),
      });

      return await this.shortUrlRepository.save(shortUrl);
    } catch (err) {
      throw new ShortUrlCodeCreateException();
    }
  }
}
