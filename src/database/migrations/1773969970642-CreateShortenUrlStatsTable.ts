import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateShortenUrlStatsTable1773969970642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "shorten_url_stats",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "short_url_id",
            type: "uuid",
          },
          {
            name: "access_count",
            type: "integer",
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "shorten_url_stats",
      new TableForeignKey({
        columnNames: ["short_url_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "short_urls",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("shorten_url_stats");
  }
}
