import { Inject, Injectable } from "@nestjs/common";
import {
  SHORT_URL_REPOSITORY,
  ShortUrlRepository,
} from "../../domain/repositories/short-url.repository.js";
import { ShortUrlNotFoundException } from "../../domain/exceptions/short-url-not-found.exception.js";

@Injectable()
export class GetShortUrlUseCase {
  constructor(
    @Inject(SHORT_URL_REPOSITORY)
    private readonly shortUrlRepository: ShortUrlRepository,
  ) {}

  async execute(code: string) {
    const shortUrl = await this.shortUrlRepository.findByCode(code);

    if (!shortUrl) {
      throw new ShortUrlNotFoundException();
    }

    return shortUrl;
  }
}
