export class UrlStats {
  constructor(
    public readonly id: string | null,
    public readonly shortUrlId: string,
    public readonly accessCount: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
  ) {}

  static create(shortUrlId: string): UrlStats {
    return new UrlStats(null, shortUrlId, 0, new Date(), null);
  }
}
