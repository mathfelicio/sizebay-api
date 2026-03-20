import { ShortUrlMapper } from './short-url.mapper';
import { ShortUrl } from '../../domain/entities/short-url.entity';
import { ShortUrlEntity } from '../entities/short-url.entity';

describe('ShortUrlMapper', () => {
  it('should map Domain to PostgresEntity', () => {
    const domain = ShortUrl.rehydrate({
      id: 'uuid-123',
      code: 'code123',
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.ly/code123',
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: null,
    });

    const entity = ShortUrlMapper.toPostgresEntity(domain);

    expect(entity.id).toBe('uuid-123');
    expect(entity.code).toBe('code123');
    expect(entity.originalUrl).toBe('https://example.com');
    expect(entity.shortUrl).toBe('https://short.ly/code123');
    expect(entity.createdAt).toEqual(new Date('2023-01-01T00:00:00.000Z'));
    expect(entity.updatedAt).toBeNull();
  });

  it('should map PostgresEntity to Domain', () => {
    const entity = new ShortUrlEntity();
    entity.id = 'uuid-123';
    entity.code = 'code123';
    entity.originalUrl = 'https://example.com';
    entity.shortUrl = 'https://short.ly/code123';
    entity.createdAt = new Date('2023-01-01T00:00:00.000Z');
    entity.updatedAt = new Date('2023-01-02T00:00:00.000Z');

    const domain = ShortUrlMapper.toDomain(entity);

    expect(domain.id).toBe('uuid-123');
    expect(domain.code).toBe('code123');
    expect(domain.originalUrl).toBe('https://example.com');
    expect(domain.shortUrl).toBe('https://short.ly/code123');
    expect(domain.createdAt).toEqual(new Date('2023-01-01T00:00:00.000Z'));
    expect(domain.updatedAt).toEqual(new Date('2023-01-02T00:00:00.000Z'));
  });
});
