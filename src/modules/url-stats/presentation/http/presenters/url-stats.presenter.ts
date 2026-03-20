import { ApiProperty } from "@nestjs/swagger";

export class UrlStatsPresenter {
  @ApiProperty({ description: "ID da URL encurtada", example: "1" })
  id!: string | null;

  @ApiProperty({ description: "A URL de destino original", example: "https://www.example.com/some/long/url" })
  url!: string;

  @ApiProperty({ description: "O código curto único", example: "abc123" })
  shortCode!: string;

  @ApiProperty({ description: "Data de criação" })
  createdAt!: Date;

  @ApiProperty({ description: "Data da última atualização" })
  updatedAt!: Date | null;

  @ApiProperty({ description: "Número de acessos", example: 10 })
  accessCount!: number;

  static toHttp(data: {
    id: string | null;
    url: string;
    shortCode: string;
    createdAt: Date;
    updatedAt: Date | null;
    accessCount: number;
  }): UrlStatsPresenter {
    const presenter = new UrlStatsPresenter();
    presenter.id = data.id;
    presenter.url = data.url;
    presenter.shortCode = data.shortCode;
    presenter.createdAt = data.createdAt;
    presenter.updatedAt = data.updatedAt;
    presenter.accessCount = data.accessCount;
    return presenter;
  }
}
