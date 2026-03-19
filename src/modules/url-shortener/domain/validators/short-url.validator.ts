import { ShortUrl } from "../entities/short-url.entity.js";

export class ShortUrlValidator {
  static validate(entity: ShortUrl) {
    if (!entity.code.trim()) {
      throw new Error("Short URL code is required");
    }

    if (!entity.originalUrl.trim()) {
      throw new Error("Original URL is required");
    }

    if (!entity.shortUrl.trim()) {
      throw new Error("Short URL is required");
    }

    this.ensureHttpUrl(entity.originalUrl, "Invalid original URL");
    this.ensureHttpUrl(entity.shortUrl, "Invalid short URL");
  }

  private static ensureHttpUrl(url: string, message: string) {
    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error(message);
      }
    } catch {
      throw new Error(message);
    }
  }
}
