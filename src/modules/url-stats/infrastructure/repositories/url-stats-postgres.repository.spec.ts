import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UrlStatsPostgresRepository } from "./url-stats-postgres.repository";
import { UrlStatsOrmEntity } from "../entities/url-stats-orm.entity";
import { UrlStats } from "../../domain/entities/url-stats.entity";

describe("UrlStatsPostgresRepository", () => {
  let repository: UrlStatsPostgresRepository;
  let typeOrmRepository: jest.Mocked<Repository<UrlStatsOrmEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlStatsPostgresRepository,
        {
          provide: getRepositoryToken(UrlStatsOrmEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<UrlStatsPostgresRepository>(
      UrlStatsPostgresRepository,
    );
    typeOrmRepository = module.get(getRepositoryToken(UrlStatsOrmEntity));
  });

  describe("findByShortUrlId", () => {
    it("should find stats by short url id", async () => {
      const mockDate = new Date();
      typeOrmRepository.findOne.mockResolvedValueOnce({
        id: "uuid-123",
        shortUrlId: "short-url-uuid",
        accessCount: 10,
        createdAt: mockDate,
        updatedAt: null,
      } as UrlStatsOrmEntity);

      const result = await repository.findByShortUrlId("short-url-uuid");

      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { shortUrlId: "short-url-uuid" },
      });
      expect(result).toBeInstanceOf(UrlStats);
      expect(result?.shortUrlId).toBe("short-url-uuid");
      expect(result?.accessCount).toBe(10);
    });

    it("should return null if not found by short url id", async () => {
      typeOrmRepository.findOne.mockResolvedValueOnce(null);

      const result = await repository.findByShortUrlId("short-url-uuid");

      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { shortUrlId: "short-url-uuid" },
      });
      expect(result).toBeNull();
    });
  });

  describe("incrementAccessCount", () => {
    it("should increment access count if stats exists", async () => {
      const mockDate = new Date();
      typeOrmRepository.findOne.mockResolvedValueOnce({
        id: "uuid-123",
        shortUrlId: "short-url-uuid",
        accessCount: 5,
        createdAt: mockDate,
        updatedAt: null,
      } as UrlStatsOrmEntity);

      typeOrmRepository.save.mockResolvedValueOnce({
        id: "uuid-123",
        shortUrlId: "short-url-uuid",
        accessCount: 6,
        createdAt: mockDate,
        updatedAt: mockDate,
      } as UrlStatsOrmEntity);

      const result = await repository.incrementAccessCount("short-url-uuid");

      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({
        where: { shortUrlId: "short-url-uuid" },
      });
      expect(typeOrmRepository.save).toHaveBeenCalled();
      expect(result.accessCount).toBe(6);
    });

    it("should create new stats if not exists", async () => {
      typeOrmRepository.findOne.mockResolvedValueOnce(null);
      typeOrmRepository.create.mockReturnValue({
        shortUrlId: "short-url-uuid",
        accessCount: 1,
      } as UrlStatsOrmEntity);

      const mockDate = new Date();
      typeOrmRepository.save.mockResolvedValueOnce({
        id: "uuid-123",
        shortUrlId: "short-url-uuid",
        accessCount: 1,
        createdAt: mockDate,
        updatedAt: null,
      } as UrlStatsOrmEntity);

      const result = await repository.incrementAccessCount("short-url-uuid");

      expect(typeOrmRepository.create).toHaveBeenCalledWith({
        shortUrlId: "short-url-uuid",
        accessCount: 1,
      });
      expect(typeOrmRepository.save).toHaveBeenCalled();
      expect(result.accessCount).toBe(1);
    });
  });
});
