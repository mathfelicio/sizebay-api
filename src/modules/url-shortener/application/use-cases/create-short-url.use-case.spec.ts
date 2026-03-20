import { CreateShortUrlUseCase } from './create-short-url.use-case';
import { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { ShortUrlBuilder } from '../builders/short-url.builder';
import { ShortUrlCodeCreateException } from '../../domain/exceptions/short-url-code-create.exception';
import { ShortUrl } from '../../domain/entities/short-url.entity';

describe('CreateShortUrlUseCase', () => {
  let useCase: CreateShortUrlUseCase;
  let repository: jest.Mocked<ShortUrlRepository>;
  let builder: jest.Mocked<ShortUrlBuilder>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findByCode: jest.fn(),
      findByOriginalUrl: jest.fn(),
      delete: jest.fn(),
    };
    builder = {
      build: jest.fn(),
    } as any;

    useCase = new CreateShortUrlUseCase(repository, builder);
  });

  it('should return existing short URL if original URL is already shortened', async () => {
    const originalUrl = 'https://example.com';
    const existingShortUrl = ShortUrl.create({
      code: 'code123',
      originalUrl,
      shortUrl: 'https://short.ly/code123'
    });

    repository.findByOriginalUrl.mockResolvedValue(existingShortUrl);

    const result = await useCase.execute(originalUrl);

    expect(result).toBe(existingShortUrl);
    expect(repository.findByOriginalUrl).toHaveBeenCalledWith(originalUrl);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should create and save new short URL', async () => {
    const originalUrl = 'https://example.com/new';
    const mockShortUrl = 'https://short.ly/random';

    repository.findByOriginalUrl.mockResolvedValue(null);
    builder.build.mockReturnValue(mockShortUrl);

    repository.save.mockImplementation(async (entity) => {
      Object.assign(entity, { id: 'uuid-1234' });
      return entity;
    });

    const result = await useCase.execute(originalUrl);

    expect(repository.findByOriginalUrl).toHaveBeenCalledWith(originalUrl);
    expect(builder.build).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalled();
    expect(result.originalUrl).toBe(originalUrl);
    expect(result.shortUrl).toBe(mockShortUrl);
    expect(result.code).toBeDefined();
  });

  it('should throw ShortUrlCodeCreateException on repository save error', async () => {
    const originalUrl = 'https://example.com/error';

    repository.findByOriginalUrl.mockResolvedValue(null);
    builder.build.mockReturnValue('https://short.ly/error');
    repository.save.mockRejectedValue(new Error('DB Error'));

    await expect(useCase.execute(originalUrl)).rejects.toThrow(ShortUrlCodeCreateException);
  });
});
