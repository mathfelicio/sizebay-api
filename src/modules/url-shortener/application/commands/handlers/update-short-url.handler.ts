import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateShortUrlCommand } from "../update-short-url.command.js";
import { UpdateShortUrlUseCase } from "../../use-cases/update-short-url.use-case.js";
import { ShortUrl } from "../../../domain/entities/short-url.entity.js";

@CommandHandler(UpdateShortUrlCommand)
export class UpdateShortUrlCommandHandler implements ICommandHandler<
  UpdateShortUrlCommand,
  ShortUrl
> {
  constructor(private readonly updateShortUrlUseCase: UpdateShortUrlUseCase) {}

  async execute(command: UpdateShortUrlCommand): Promise<ShortUrl> {
    return this.updateShortUrlUseCase.execute(command.code, command.url);
  }
}
