import { ShortUrl } from '../entities/short-url.entity';
import { ShortUrlValidator } from './short-url.validator';

describe('ShortUrlValidator', () => {
  it('should throw error if code is empty', () => {
    expect(() => {
      ShortUrl.create({
        code: '  ',
        originalUrl: 'https://example.com',
        shortUrl: 'https://short.ly/code123',
      });
    }).toThrow('Short URL code is required');
  });

  it('should throw error if original URL is empty', () => {
    expect(() => {
      ShortUrl.create({
        code: 'code123',
        originalUrl: '',
        shortUrl: 'https://short.ly/code123',
      });
    }).toThrow('Original URL is required');
  });

  it('should throw error if short URL is empty', () => {
    expect(() => {
      ShortUrl.create({
        code: 'code123',
        originalUrl: 'https://example.com',
        shortUrl: ' ',
      });
    }).toThrow('Short URL is required');
  });

  it('should throw error if original URL is invalid', () => {
    expect(() => {
      ShortUrl.create({
        code: 'code123',
        originalUrl: 'invalid-url',
        shortUrl: 'https://short.ly/code123',
      });
    }).toThrow('Invalid original URL');
  });

  it('should throw error if short URL is invalid', () => {
    expect(() => {
      ShortUrl.create({
        code: 'code123',
        originalUrl: 'https://example.com',
        shortUrl: 'invalid-url',
      });
    }).toThrow('Invalid short URL');
  });

  it('should not throw error for valid ShortUrl', () => {
    expect(() => {
      ShortUrl.create({
        code: 'code123',
        originalUrl: 'https://example.com',
        shortUrl: 'https://short.ly/code123',
      });
    }).not.toThrow();
  });
});
