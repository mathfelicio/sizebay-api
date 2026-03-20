import { ShortUrlBuilder } from './short-url.builder';

describe('ShortUrlBuilder', () => {
  let builder: ShortUrlBuilder;

  beforeEach(() => {
    builder = new ShortUrlBuilder();
  });

  afterEach(() => {
    jest.resetModules();
    delete process.env.APP_BASE_URL;
  });

  it('should use default base URL when env variable is not set', () => {
    const code = 'abc123';
    const result = builder.build(code);

    expect(result).toBe('http://localhost:3050/shorten/abc123');
  });

  it('should use APP_BASE_URL when env variable is set', () => {
    process.env.APP_BASE_URL = 'https://sizebay.com';
    const code = 'xyz789';
    const result = builder.build(code);

    expect(result).toBe('https://sizebay.com/shorten/xyz789');
  });

  it('should correctly remove trailing slash from base URL', () => {
    process.env.APP_BASE_URL = 'https://sizebay.com/';
    const code = 'xyz789';
    const result = builder.build(code);

    expect(result).toBe('https://sizebay.com/shorten/xyz789');
  });
});
