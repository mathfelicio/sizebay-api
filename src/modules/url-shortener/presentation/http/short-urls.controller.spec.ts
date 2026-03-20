import { Test, TestingModule } from "@nestjs/testing";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { ShortUrlPresenter } from "./presenters/short-url.presenter";
import { ShortUrl } from "../../domain/entities/short-url.entity";
import { ShortUrlsController } from "./short-urls.controller";
import { CreateShortUrlCommand } from "../../application/commands/create-short-url.command";
import { UpdateShortUrlCommand } from "../../application/commands/update-short-url.command";
import { DeleteShortUrlCommand } from "../../application/commands/delete-short-url.command";
import { GetShortUrlQuery } from "../../application/queries/get-short-url.query";

describe("ShortUrlsController", () => {
  let controller: ShortUrlsController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlsController],
      providers: [
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ShortUrlsController>(ShortUrlsController);
    commandBus = module.get(CommandBus);
    queryBus = module.get(QueryBus);
  });

  describe("create", () => {
    it("should create a short url", async () => {
      const mockShortUrl = ShortUrl.create({
        code: "code123",
        originalUrl: "https://example.com",
        shortUrl: "https://short.ly/code123",
      });
      commandBus.execute.mockResolvedValue(mockShortUrl);

      const result = await controller.create({ url: "https://example.com" });

      expect(commandBus.execute).toHaveBeenCalledWith(
        expect.any(CreateShortUrlCommand),
      );
      expect(result).toBeInstanceOf(ShortUrlPresenter);
      expect(result.code).toBe("code123");
    });
  });

  describe("findOne", () => {
    it("should get a short url", async () => {
      const mockShortUrl = ShortUrl.create({
        code: "code123",
        originalUrl: "https://example.com",
        shortUrl: "https://short.ly/code123",
      });
      queryBus.execute.mockResolvedValue(mockShortUrl);

      const result = await controller.findOne("code123");

      expect(queryBus.execute).toHaveBeenCalledWith(
        expect.any(GetShortUrlQuery),
      );
      expect(result).toBeInstanceOf(ShortUrlPresenter);
      expect(result.code).toBe("code123");
    });
  });

  describe("update", () => {
    it("should update a short url", async () => {
      const mockShortUrl = ShortUrl.create({
        code: "code123",
        originalUrl: "https://example.org",
        shortUrl: "https://short.ly/code123",
      });
      commandBus.execute.mockResolvedValue(mockShortUrl);

      const result = await controller.update("code123", {
        url: "https://example.org",
      });

      expect(commandBus.execute).toHaveBeenCalledWith(
        expect.any(UpdateShortUrlCommand),
      );
      expect(result).toBeInstanceOf(ShortUrlPresenter);
      expect(result.originalUrl).toBe("https://example.org");
    });
  });

  describe("remove", () => {
    it("should delete a short url", async () => {
      commandBus.execute.mockResolvedValue(undefined);

      await controller.remove("code123");

      expect(commandBus.execute).toHaveBeenCalledWith(
        expect.any(DeleteShortUrlCommand),
      );
    });
  });
});
