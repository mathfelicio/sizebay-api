import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { CreateShortUrlUseCase } from "../../application/use-cases/create-short-url.use-case.js";
import { GetShortUrlUseCase } from "../../application/use-cases/get-short-url.use-case.js";
import { CreateShortUrlDto } from "./dto/create-short-url.dto.js";
import { ShortUrlPresenter } from "./presenters/short-url.presenter.js";

@Controller("shorten")
export class ShortUrlsController {
  constructor(
    private readonly createShortUrlUseCase: CreateShortUrlUseCase,
    private readonly getShortUrlUseCase: GetShortUrlUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateShortUrlDto) {
    const shortUrl = await this.createShortUrlUseCase.execute(body.url);

    return ShortUrlPresenter.toHttp(shortUrl);
  }

  @Get(":code")
  async findOne(@Param("code") code: string) {
    const shortUrl = await this.getShortUrlUseCase.execute(code);

    if (!shortUrl) {
      throw new NotFoundException("Short URL not found");
    }

    return ShortUrlPresenter.toHttp(shortUrl);
  }
}
