export class UpdateShortUrlCommand {
  constructor(
    public readonly code: string,
    public readonly url: string,
  ) {}
}
