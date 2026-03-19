import { ApiProperty } from "@nestjs/swagger";
import { ShortUrl } from "../../../domain/entities/short-url.entity.js";

export class ShortUrlPresenter {
  @ApiProperty({ description: "O código curto único", example: "SHF8fA" })
  code!: string;

  @ApiProperty({ description: "Data de criação" })
  createdAt!: Date;

  @ApiProperty({ description: "A URL de destino original", example: "https://www.sizebay.com" })
  originalUrl!: string;

  @ApiProperty({ description: "A URL encurtada gerada", example: "http://localhost:3050/short-urls/SHF8fA" })
  shortUrl!: string;

  static toHttp(shortUrl: ShortUrl): ShortUrlPresenter {
    const presenter = new ShortUrlPresenter();
    presenter.code = shortUrl.code;
    presenter.createdAt = shortUrl.createdAt;
    presenter.originalUrl = shortUrl.originalUrl;
    presenter.shortUrl = shortUrl.shortUrl;
    return presenter;
  }
}
