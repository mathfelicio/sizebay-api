import { GetShortUrlUseCase } from './get-short-url.use-case';
import { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { ShortUrlNotFoundException } from '../../domain/exceptions/short-url-not-found.exception';
import { ShortUrl } from '../../domain/entities/short-url.entity';

describe('GetShortUrlUseCase', () => {
  let useCase: GetShortUrlUseCase;
  let repository: jest.Mocked<ShortUrlRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findByCode: jest.fn(),
      findByOriginalUrl: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new GetShortUrlUseCase(repository);
  });

  it('should return short URL if found', async () => {
    const code = 'code123';
    const existingShortUrl = ShortUrl.create({
      code,
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.ly/code123'
    });

    repository.findByCode.mockResolvedValue(existingShortUrl);

    const result = await useCase.execute(code);

    expect(result).toBe(existingShortUrl);
    expect(repository.findByCode).toHaveBeenCalledWith(code);
  });

  it('should throw ShortUrlNotFoundException if not found', async () => {
    const code = 'notfound';
    repository.findByCode.mockResolvedValue(null);

    await expect(useCase.execute(code)).rejects.toThrow(ShortUrlNotFoundException);
    expect(repository.findByCode).toHaveBeenCalledWith(code);
  });
});
