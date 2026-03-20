import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShortUrlPostgresRepository } from "./short-url-postgres.repository";
import { ShortUrlOrmEntity } from "../entities/short-url-orm.entity";
import { ShortUrl } from "../../domain/entities/short-url.entity";

describe("ShortUrlPostgresRepository", () => {
  let repository: ShortUrlPostgresRepository;
  let typeOrmRepository: jest.Mocked<Repository<ShortUrlOrmEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortUrlPostgresRepository,
        {
          provide: getRepositoryToken(ShortUrlOrmEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ShortUrlPostgresRepository>(
      ShortUrlPostgresRepository,
    );
    typeOrmRepository = module.get(getRepositoryToken(ShortUrlOrmEntity));
  });

  it("should save short url", async () => {
    const shortUrl = ShortUrl.create({
      code: "code123",
      originalUrl: "https://example.com",
      shortUrl: "https://short.ly/code123",
    });

    typeOrmRepository.save.mockResolvedValueOnce({
      id: "uuid-123",
      code: "code123",
      originalUrl: "https://example.com",
      shortUrl: "https://short.ly/code123",
      createdAt: shortUrl.createdAt,
      updatedAt: shortUrl.updatedAt,
    } as ShortUrlOrmEntity);

    const result = await repository.save(shortUrl);

    expect(typeOrmRepository.save).toHaveBeenCalled();
    expect(result.id).toBe("uuid-123");
    expect(result.code).toBe("code123");
  });

  it("should find by code", async () => {
    const mockDate = new Date();
    typeOrmRepository.findOne.mockResolvedValueOnce({
      id: "uuid-123",
      code: "code123",
      originalUrl: "https://example.com",
      shortUrl: "https://short.ly/code123",
      createdAt: mockDate,
      updatedAt: null,
    } as ShortUrlOrmEntity);

    const result = await repository.findByCode("code123");

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { code: "code123" },
    });
    expect(result).toBeDefined();
    expect(result?.code).toBe("code123");
  });

  it("should return null if not found by code", async () => {
    typeOrmRepository.findOne.mockResolvedValueOnce(null);

    const result = await repository.findByCode("code123");

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { code: "code123" },
    });
    expect(result).toBeNull();
  });

  it("should find by originalUrl", async () => {
    const mockDate = new Date();
    typeOrmRepository.findOne.mockResolvedValueOnce({
      id: "uuid-123",
      code: "code123",
      originalUrl: "https://example.com",
      shortUrl: "https://short.ly/code123",
      createdAt: mockDate,
      updatedAt: null,
    } as ShortUrlOrmEntity);

    const result = await repository.findByOriginalUrl("https://example.com");

    expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
      where: { originalUrl: "https://example.com" },
    });
    expect(result).toBeDefined();
    expect(result?.originalUrl).toBe("https://example.com");
  });

  it("should delete short url", async () => {
    typeOrmRepository.delete.mockResolvedValueOnce({ affected: 1, raw: [] });

    await repository.delete("code123");

    expect(typeOrmRepository.delete).toHaveBeenCalledWith({ code: "code123" });
  });
});
