import { GetUrlStatsUseCase } from "./get-url-stats.use-case";
import { ShortUrlRepository } from "../../../url-shortener/domain/repositories/short-url.repository";
import { UrlStatsRepository } from "../../domain/repositories/url-stats.repository";
import { ShortUrlNotFoundException } from "../../../url-shortener/domain/exceptions/short-url-not-found.exception";
import { ShortUrl } from "../../../url-shortener/domain/entities/short-url.entity";
import { UrlStats } from "../../domain/entities/url-stats.entity";

describe("GetUrlStatsUseCase", () => {
  let useCase: GetUrlStatsUseCase;
  let shortUrlRepository: jest.Mocked<ShortUrlRepository>;
  let urlStatsRepository: jest.Mocked<UrlStatsRepository>;

  beforeEach(() => {
    shortUrlRepository = {
      save: jest.fn(),
      findByCode: jest.fn(),
      findByOriginalUrl: jest.fn(),
      delete: jest.fn(),
    };

    urlStatsRepository = {
      findByShortUrlId: jest.fn(),
      incrementAccessCount: jest.fn(),
    };

    useCase = new GetUrlStatsUseCase(
      shortUrlRepository,
      urlStatsRepository as any,
    );
  });

  it("should return stats when short URL exists and has stats", async () => {
    const code = "code123";
    const existingShortUrl = ShortUrl.rehydrate({
      id: "uuid-123",
      code,
      originalUrl: "https://example.com",
      shortUrl: "https://short.ly/code123",
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: null,
    });
    const existingStats = new UrlStats(
      "stats-uuid",
      "uuid-123",
      100,
      new Date("2023-01-01T00:00:00.000Z"),
      new Date("2023-01-02T00:00:00.000Z"),
    );

    shortUrlRepository.findByCode.mockResolvedValue(existingShortUrl);
    urlStatsRepository.findByShortUrlId.mockResolvedValue(existingStats);

    const result = await useCase.execute(code);

    expect(result).toEqual({
      id: "uuid-123",
      url: "https://example.com",
      shortCode: "code123",
      createdAt: existingShortUrl.createdAt,
      updatedAt: null,
      accessCount: 100,
    });
    expect(shortUrlRepository.findByCode).toHaveBeenCalledWith(code);
    expect(urlStatsRepository.findByShortUrlId).toHaveBeenCalledWith(
      "uuid-123",
    );
  });

  it("should return stats with access count 0 when no stats exist", async () => {
    const code = "code123";
    const existingShortUrl = ShortUrl.rehydrate({
      id: "uuid-123",
      code,
      originalUrl: "https://example.com",
      shortUrl: "https://short.ly/code123",
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: null,
    });

    shortUrlRepository.findByCode.mockResolvedValue(existingShortUrl);
    urlStatsRepository.findByShortUrlId.mockResolvedValue(null);

    const result = await useCase.execute(code);

    expect(result).toEqual({
      id: "uuid-123",
      url: "https://example.com",
      shortCode: "code123",
      createdAt: existingShortUrl.createdAt,
      updatedAt: null,
      accessCount: 0,
    });
    expect(shortUrlRepository.findByCode).toHaveBeenCalledWith(code);
    expect(urlStatsRepository.findByShortUrlId).toHaveBeenCalledWith(
      "uuid-123",
    );
  });

  it("should throw ShortUrlNotFoundException if short URL not found", async () => {
    const code = "notfound";
    shortUrlRepository.findByCode.mockResolvedValue(null);

    await expect(useCase.execute(code)).rejects.toThrow(
      ShortUrlNotFoundException,
    );
    expect(shortUrlRepository.findByCode).toHaveBeenCalledWith(code);
    expect(urlStatsRepository.findByShortUrlId).not.toHaveBeenCalled();
  });
});
