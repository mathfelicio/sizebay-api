import { ShortUrl } from './short-url.entity';

describe('ShortUrl Entity', () => {
  it('should create a new ShortUrl instance via create method', () => {
    const props = {
      code: 'code123',
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.ly/code123',
    };

    const entity = ShortUrl.create(props);

    expect(entity.id).toBeNull();
    expect(entity.code).toBe(props.code);
    expect(entity.originalUrl).toBe(props.originalUrl);
    expect(entity.shortUrl).toBe(props.shortUrl);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeNull();
  });

  it('should rehydrate a ShortUrl instance', () => {
    const props = {
      id: 'uuid-1234',
      code: 'code123',
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.ly/code123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = ShortUrl.rehydrate(props);

    expect(entity.id).toBe(props.id);
    expect(entity.code).toBe(props.code);
    expect(entity.originalUrl).toBe(props.originalUrl);
    expect(entity.shortUrl).toBe(props.shortUrl);
    expect(entity.createdAt).toBe(props.createdAt);
    expect(entity.updatedAt).toBe(props.updatedAt);
  });

  it('should update originalUrl and update updatedAt', () => {
    const entity = ShortUrl.create({
      code: 'code123',
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.ly/code123',
    });

    const newUrl = 'https://example.org';
    entity.updateOriginalUrl(newUrl);

    expect(entity.originalUrl).toBe(newUrl);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });
});
