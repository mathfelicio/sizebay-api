import path from "path";
import { env } from "process";
import { DataSource } from "typeorm";

export const postgresOrmDataSource = new DataSource({
  type: "postgres",
  host: env.POSTGRES_HOST || "postgres",
  port: parseInt(env.POSTGRES_PORT || "5432", 10),
  username: env.POSTGRES_USER || "root",
  password: env.POSTGRES_PASSWORD || "root",
  database: env.POSTGRES_DB || "sizebay",
  synchronize: false,
  entities: [
    path.resolve(__dirname, "..", "..", "**", "*.entity{.ts,.js}"),
  ],
  migrations: [
    path.resolve(__dirname, "..", "migrations", "*{.ts,.js}"),
  ],
  migrationsRun: true,
});
