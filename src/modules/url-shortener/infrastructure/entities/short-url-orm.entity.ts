import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UrlStatsOrmEntity } from "../../../url-stats/infrastructure/entities/url-stats-orm.entity.js";

@Entity("short_urls")
export class ShortUrlOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  code!: string;

  @Column({ name: "original_url" })
  originalUrl!: string;

  @Column({ name: "short_url" })
  shortUrl!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt!: Date | null;

  @OneToOne(() => UrlStatsOrmEntity, (stats) => stats.shortUrl, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "id", referencedColumnName: "shortUrlId" })
  stats!: UrlStatsOrmEntity | null;
}
