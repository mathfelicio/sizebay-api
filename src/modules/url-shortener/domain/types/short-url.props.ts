export interface ShortUrlProps {
  id: string | null;
  code: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}
