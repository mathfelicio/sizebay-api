import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteShortUrlCommand } from "../delete-short-url.command.js";
import { DeleteShortUrlUseCase } from "../../use-cases/delete-short-url.use-case.js";

@CommandHandler(DeleteShortUrlCommand)
export class DeleteShortUrlCommandHandler implements ICommandHandler<
  DeleteShortUrlCommand,
  void
> {
  constructor(private readonly deleteShortUrlUseCase: DeleteShortUrlUseCase) {}

  async execute(command: DeleteShortUrlCommand): Promise<void> {
    await this.deleteShortUrlUseCase.execute(command.code);
  }
}
