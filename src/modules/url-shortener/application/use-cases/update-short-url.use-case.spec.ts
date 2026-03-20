import { UpdateShortUrlUseCase } from './update-short-url.use-case';
import { ShortUrlRepository } from '../../domain/repositories/short-url.repository';
import { ShortUrlNotFoundException } from '../../domain/exceptions/short-url-not-found.exception';
import { ShortUrl } from '../../domain/entities/short-url.entity';

describe('UpdateShortUrlUseCase', () => {
  let useCase: UpdateShortUrlUseCase;
  let repository: jest.Mocked<ShortUrlRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findByCode: jest.fn(),
      findByOriginalUrl: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new UpdateShortUrlUseCase(repository);
  });

  it('should update original URL and save if found', async () => {
    const code = 'code123';
    const newOriginalUrl = 'https://example.org';
    
    const existingShortUrl = ShortUrl.create({
      code,
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.ly/code123'
    });

    repository.findByCode.mockResolvedValue(existingShortUrl);
    repository.save.mockImplementation(async (entity) => entity);

    const result = await useCase.execute(code, newOriginalUrl);

    expect(repository.findByCode).toHaveBeenCalledWith(code);
    expect(existingShortUrl.originalUrl).toBe(newOriginalUrl);
    expect(repository.save).toHaveBeenCalledWith(existingShortUrl);
    expect(result).toBe(existingShortUrl);
  });

  it('should throw ShortUrlNotFoundException if not found', async () => {
    const code = 'notfound';
    repository.findByCode.mockResolvedValue(null);

    await expect(useCase.execute(code, 'https://example.org')).rejects.toThrow(ShortUrlNotFoundException);
    expect(repository.findByCode).toHaveBeenCalledWith(code);
    expect(repository.save).not.toHaveBeenCalled();
  });
});
