export class ShortUrlAccessedEvent {
  constructor(
    public readonly shortUrlId: string,
    public readonly code: string,
  ) {}
}
