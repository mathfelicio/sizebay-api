import { ShortUrlPresenter } from './short-url.presenter';
import { ShortUrl } from '../../../domain/entities/short-url.entity';

describe('ShortUrlPresenter', () => {
  it('should map ShortUrl to ShortUrlPresenter', () => {
    const shortUrl = ShortUrl.rehydrate({
      id: 'uuid-123',
      code: 'code123',
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.ly/code123',
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: null,
    });

    const presenter = ShortUrlPresenter.toHttp(shortUrl);

    expect(presenter.code).toBe('code123');
    expect(presenter.originalUrl).toBe('https://example.com');
    expect(presenter.shortUrl).toBe('https://short.ly/code123');
    expect(presenter.createdAt).toEqual(new Date('2023-01-01T00:00:00.000Z'));
  });
});
