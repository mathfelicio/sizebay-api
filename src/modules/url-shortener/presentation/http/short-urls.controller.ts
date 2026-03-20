import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateShortUrlCommand } from "../../application/commands/create-short-url.command.js";
import { UpdateShortUrlCommand } from "../../application/commands/update-short-url.command.js";
import { DeleteShortUrlCommand } from "../../application/commands/delete-short-url.command.js";
import { GetShortUrlQuery } from "../../application/queries/get-short-url.query.js";
import { CreateShortUrlDto } from "./dto/create-short-url.dto.js";
import { UpdateShortUrlDto } from "./dto/update-short-url.dto.js";
import { ShortUrlPresenter } from "./presenters/short-url.presenter.js";
import { ShortUrl } from "../../domain/entities/short-url.entity.js";

@ApiTags("URLs Encurtadas")
@Controller("shorten")
export class ShortUrlsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova URL encurtada" })
  @ApiResponse({
    status: 201,
    description: "URL encurtada criada com sucesso",
    type: ShortUrlPresenter,
  })
  async create(@Body() body: CreateShortUrlDto) {
    const shortUrl = await this.commandBus.execute<
      CreateShortUrlCommand,
      ShortUrl
    >(new CreateShortUrlCommand(body.url));

    return ShortUrlPresenter.toHttp(shortUrl);
  }

  @Get(":code")
  @ApiOperation({
    summary: "Obtém a URL original a partir do código encurtado",
  })
  @ApiResponse({
    status: 200,
    description: "Retorna os detalhes da URL encurtada",
    type: ShortUrlPresenter,
  })
  @ApiResponse({ status: 404, description: "URL encurtada não encontrada" })
  async findOne(@Param("code") code: string) {
    const shortUrl = await this.queryBus.execute<GetShortUrlQuery, ShortUrl>(
      new GetShortUrlQuery(code),
    );

    return ShortUrlPresenter.toHttp(shortUrl);
  }

  @Put(":code")
  @ApiOperation({ summary: "Atualiza a URL original de um código encurtado" })
  @ApiResponse({
    status: 200,
    description: "Retorna os detalhes atualizados da URL encurtada",
    type: ShortUrlPresenter,
  })
  @ApiResponse({ status: 404, description: "URL encurtada não encontrada" })
  async update(@Param("code") code: string, @Body() body: UpdateShortUrlDto) {
    const shortUrl = await this.commandBus.execute<
      UpdateShortUrlCommand,
      ShortUrl
    >(new UpdateShortUrlCommand(code, body.url));

    return ShortUrlPresenter.toHttp(shortUrl);
  }

  @Delete(":code")
  @HttpCode(204)
  @ApiOperation({ summary: "Exclui um código encurtado" })
  @ApiResponse({
    status: 204,
    description: "URL encurtada excluída com sucesso",
  })
  @ApiResponse({ status: 404, description: "URL encurtada não encontrada" })
  async remove(@Param("code") code: string) {
    await this.commandBus.execute(new DeleteShortUrlCommand(code));
  }
}
