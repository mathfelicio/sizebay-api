import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShortUrlsTable1773937476941 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "short_urls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "originalUrl" character varying NOT NULL, "shortUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_36d7fc390c3e722f91a46838833" UNIQUE ("code"), CONSTRAINT "PK_0bee0ef97594699927c1b7c81a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "short_urls"`);
    }

}
