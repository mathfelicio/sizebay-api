import { UrlStatsPresenter } from "./url-stats.presenter";

describe("UrlStatsPresenter", () => {
  it("should map data to UrlStatsPresenter", () => {
    const data = {
      id: "uuid-123",
      url: "https://example.com",
      shortCode: "code123",
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: new Date("2023-01-02T00:00:00.000Z"),
      accessCount: 100,
    };

    const presenter = UrlStatsPresenter.toHttp(data);

    expect(presenter.id).toBe("uuid-123");
    expect(presenter.url).toBe("https://example.com");
    expect(presenter.shortCode).toBe("code123");
    expect(presenter.createdAt).toEqual(new Date("2023-01-01T00:00:00.000Z"));
    expect(presenter.updatedAt).toEqual(new Date("2023-01-02T00:00:00.000Z"));
    expect(presenter.accessCount).toBe(100);
  });

  it("should handle null updatedAt", () => {
    const data = {
      id: "uuid-123",
      url: "https://example.com",
      shortCode: "code123",
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: null,
      accessCount: 0,
    };

    const presenter = UrlStatsPresenter.toHttp(data);

    expect(presenter.updatedAt).toBeNull();
  });
});
