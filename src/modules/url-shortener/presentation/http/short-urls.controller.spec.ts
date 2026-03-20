import { Test, TestingModule } from '@nestjs/testing';

import { ShortUrlPresenter } from './presenters/short-url.presenter';
import { ShortUrl } from '../../domain/entities/short-url.entity';
import { ShortUrlsController } from './short-urls.controller';
import { CreateShortUrlUseCase } from '../../application/use-cases/create-short-url.use-case';
import { DeleteShortUrlUseCase } from '../../application/use-cases/delete-short-url.use-case';
import { GetShortUrlUseCase } from '../../application/use-cases/get-short-url.use-case';
import { UpdateShortUrlUseCase } from '../../application/use-cases/update-short-url.use-case';

describe('ShortUrlsController', () => {
  let controller: ShortUrlsController;
  let createUseCase: jest.Mocked<CreateShortUrlUseCase>;
  let getUseCase: jest.Mocked<GetShortUrlUseCase>;
  let updateUseCase: jest.Mocked<UpdateShortUrlUseCase>;
  let deleteUseCase: jest.Mocked<DeleteShortUrlUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortUrlsController],
      providers: [
        {
          provide: CreateShortUrlUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetShortUrlUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateShortUrlUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteShortUrlUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ShortUrlsController>(ShortUrlsController);
    createUseCase = module.get(CreateShortUrlUseCase);
    getUseCase = module.get(GetShortUrlUseCase);
    updateUseCase = module.get(UpdateShortUrlUseCase);
    deleteUseCase = module.get(DeleteShortUrlUseCase);
  });

  describe('create', () => {
    it('should create a short url', async () => {
      const mockShortUrl = ShortUrl.create({
        code: 'code123',
        originalUrl: 'https://example.com',
        shortUrl: 'https://short.ly/code123',
      });
      createUseCase.execute.mockResolvedValue(mockShortUrl);

      const result = await controller.create({ url: 'https://example.com' });

      expect(createUseCase.execute).toHaveBeenCalledWith('https://example.com');
      expect(result).toBeInstanceOf(ShortUrlPresenter);
      expect(result.code).toBe('code123');
    });
  });

  describe('findOne', () => {
    it('should get a short url', async () => {
      const mockShortUrl = ShortUrl.create({
        code: 'code123',
        originalUrl: 'https://example.com',
        shortUrl: 'https://short.ly/code123',
      });
      getUseCase.execute.mockResolvedValue(mockShortUrl);

      const result = await controller.findOne('code123');

      expect(getUseCase.execute).toHaveBeenCalledWith('code123');
      expect(result).toBeInstanceOf(ShortUrlPresenter);
      expect(result.code).toBe('code123');
    });
  });

  describe('update', () => {
    it('should update a short url', async () => {
      const mockShortUrl = ShortUrl.create({
        code: 'code123',
        originalUrl: 'https://example.org',
        shortUrl: 'https://short.ly/code123',
      });
      updateUseCase.execute.mockResolvedValue(mockShortUrl);

      const result = await controller.update('code123', { url: 'https://example.org' });

      expect(updateUseCase.execute).toHaveBeenCalledWith('code123', 'https://example.org');
      expect(result).toBeInstanceOf(ShortUrlPresenter);
      expect(result.originalUrl).toBe('https://example.org');
    });
  });

  describe('remove', () => {
    it('should delete a short url', async () => {
      deleteUseCase.execute.mockResolvedValue(undefined);

      await controller.remove('code123');

      expect(deleteUseCase.execute).toHaveBeenCalledWith('code123');
    });
  });
});
