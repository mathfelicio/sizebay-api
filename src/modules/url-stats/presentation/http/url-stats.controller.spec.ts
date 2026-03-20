import { Test, TestingModule } from "@nestjs/testing";
import { QueryBus } from "@nestjs/cqrs";
import { UrlStatsController } from "./url-stats.controller";
import { GetUrlStatsQuery } from "../../application/queries/get-url-stats.query";
import { UrlStatsPresenter } from "./presenters/url-stats.presenter";

describe("UrlStatsController", () => {
  let controller: UrlStatsController;
  let queryBus: { execute: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlStatsController],
      providers: [
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<UrlStatsController>(UrlStatsController);
    queryBus = module.get(QueryBus);
  });

  describe("getStats", () => {
    it("should return stats for a short URL", async () => {
      const mockStats = {
        id: "uuid-123",
        url: "https://example.com",
        shortCode: "code123",
        createdAt: new Date("2023-01-01T00:00:00.000Z"),
        updatedAt: null,
        accessCount: 100,
      };

      queryBus.execute.mockResolvedValue(mockStats);

      const result = await controller.getStats("code123");

      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.any(GetUrlStatsQuery),
      );
      expect(result).toBeInstanceOf(UrlStatsPresenter);
      expect(result.id).toBe("uuid-123");
      expect(result.url).toBe("https://example.com");
      expect(result.accessCount).toBe(100);
    });
  });
});
