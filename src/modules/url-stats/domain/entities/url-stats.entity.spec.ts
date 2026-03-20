import { UrlStats } from "./url-stats.entity";

describe("UrlStats Entity", () => {
  it("should create a new UrlStats instance via create method", () => {
    const shortUrlId = "short-url-uuid";

    const entity = UrlStats.create(shortUrlId);

    expect(entity.id).toBeNull();
    expect(entity.shortUrlId).toBe(shortUrlId);
    expect(entity.accessCount).toBe(0);
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeNull();
  });

  it("should rehydrate a UrlStats instance", () => {
    const props = {
      id: "uuid-1234",
      shortUrlId: "short-url-uuid",
      accessCount: 100,
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: new Date("2023-01-02T00:00:00.000Z"),
    };

    const entity = new UrlStats(
      props.id,
      props.shortUrlId,
      props.accessCount,
      props.createdAt,
      props.updatedAt,
    );

    expect(entity.id).toBe(props.id);
    expect(entity.shortUrlId).toBe(props.shortUrlId);
    expect(entity.accessCount).toBe(props.accessCount);
    expect(entity.createdAt).toBe(props.createdAt);
    expect(entity.updatedAt).toBe(props.updatedAt);
  });
});
