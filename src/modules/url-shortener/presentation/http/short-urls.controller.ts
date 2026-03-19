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
import { CreateShortUrlUseCase } from "../../application/use-cases/create-short-url.use-case.js";
import { GetShortUrlUseCase } from "../../application/use-cases/get-short-url.use-case.js";
import { UpdateShortUrlUseCase } from "../../application/use-cases/update-short-url.use-case.js";
import { DeleteShortUrlUseCase } from "../../application/use-cases/delete-short-url.use-case.js";
import { CreateShortUrlDto } from "./dto/create-short-url.dto.js";
import { UpdateShortUrlDto } from "./dto/update-short-url.dto.js";
import { ShortUrlPresenter } from "./presenters/short-url.presenter.js";

@ApiTags("URLs Encurtadas")
@Controller("shorten")
export class ShortUrlsController {
  constructor(
    private readonly createShortUrlUseCase: CreateShortUrlUseCase,
    private readonly getShortUrlUseCase: GetShortUrlUseCase,
    private readonly updateShortUrlUseCase: UpdateShortUrlUseCase,
    private readonly deleteShortUrlUseCase: DeleteShortUrlUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: "Criar uma nova URL encurtada" })
  @ApiResponse({ status: 201, description: "URL encurtada criada com sucesso", type: ShortUrlPresenter })
  async create(@Body() body: CreateShortUrlDto) {
    const shortUrl = await this.createShortUrlUseCase.execute(body.url);

    return ShortUrlPresenter.toHttp(shortUrl);
  }

  @Get(":code")
  @ApiOperation({ summary: "Obtém a URL original a partir do código encurtado" })
  @ApiResponse({ status: 200, description: "Retorna os detalhes da URL encurtada", type: ShortUrlPresenter })
  @ApiResponse({ status: 404, description: "URL encurtada não encontrada" })
  async findOne(@Param("code") code: string) {
    const shortUrl = await this.getShortUrlUseCase.execute(code);


    return ShortUrlPresenter.toHttp(shortUrl);
  }

  @Put(":code")
  @ApiOperation({ summary: "Atualiza a URL original de um código encurtado" })
  @ApiResponse({ status: 200, description: "Retorna os detalhes atualizados da URL encurtada", type: ShortUrlPresenter })
  @ApiResponse({ status: 404, description: "URL encurtada não encontrada" })
  async update(
    @Param("code") code: string,
    @Body() body: UpdateShortUrlDto,
  ) {
    const shortUrl = await this.updateShortUrlUseCase.execute(code, body.url);

    return ShortUrlPresenter.toHttp(shortUrl);
  }

  @Delete(":code")
  @HttpCode(204)
  @ApiOperation({ summary: "Exclui um código encurtado" })
  @ApiResponse({ status: 204, description: "URL encurtada excluída com sucesso" })
  @ApiResponse({ status: 404, description: "URL encurtada não encontrada" })
  async remove(@Param("code") code: string) {
    await this.deleteShortUrlUseCase.execute(code);
  }
}
