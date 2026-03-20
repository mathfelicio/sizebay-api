import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateShortUrlCommand } from "../create-short-url.command.js";
import { CreateShortUrlUseCase } from "../../use-cases/create-short-url.use-case.js";
import { ShortUrl } from "../../../domain/entities/short-url.entity.js";

@CommandHandler(CreateShortUrlCommand)
export class CreateShortUrlCommandHandler implements ICommandHandler<
  CreateShortUrlCommand,
  ShortUrl
> {
  constructor(private readonly createShortUrlUseCase: CreateShortUrlUseCase) {}

  async execute(command: CreateShortUrlCommand): Promise<ShortUrl> {
    return this.createShortUrlUseCase.execute(command.url);
  }
}
