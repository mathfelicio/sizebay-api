import path from "path";
import { env } from "process";
import { DataSourceOptions } from "typeorm";

export const mongoOrmConfig: DataSourceOptions = {
  type: "mongodb",
  host: env.MONGO_HOST || "mongo",
  port: parseInt(env.MONGO_PORT || "27017", 10),
  username: env.MONGO_USERNAME || "root",
  password: env.MONGO_PASSWORD || "root",
  database: env.MONGO_DATABASE || "sizebay",
  authSource: env.MONGO_AUTH_SOURCE || "admin",
  synchronize: false,
  entities: [
    path.resolve(__dirname, "..", "..", "**", "*.mongoEntity{.ts,.js}"),
  ],
};
