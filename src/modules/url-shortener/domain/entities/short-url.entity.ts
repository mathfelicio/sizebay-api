import type { ShortUrlProps } from "../types/short-url.props.js";
import { ShortUrlValidator } from "../validators/short-url.validator.js";

export class ShortUrl {
  private constructor(
    public readonly id: string | null,
    public readonly code: string,
    public readonly originalUrl: string,
    public readonly shortUrl: string,
    public readonly createdAt: Date,
  ) {
    ShortUrlValidator.validate(this);
  }

  static create(
    props: Omit<ShortUrlProps, "id" | "createdAt"> & { id?: string | null },
  ): ShortUrl {
    return new ShortUrl(
      props.id ?? null,
      props.code,
      props.originalUrl,
      props.shortUrl,
      new Date(),
    );
  }

  static rehydrate(props: ShortUrlProps): ShortUrl {
    return new ShortUrl(
      props.id,
      props.code,
      props.originalUrl,
      props.shortUrl,
      props.createdAt,
    );
  }
}
