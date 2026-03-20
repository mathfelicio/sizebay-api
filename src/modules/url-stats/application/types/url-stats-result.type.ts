export type UrlStatsResult = {
  id: string | null;
  url: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date | null;
  accessCount: number;
};
