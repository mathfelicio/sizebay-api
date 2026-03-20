import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ShortUrlOrmEntity } from "../../../url-shortener/infrastructure/entities/short-url-orm.entity";

@Entity("shorten_url_stats")
export class UrlStatsOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "short_url_id" })
  shortUrlId!: string;

  @OneToOne(() => ShortUrlOrmEntity, (url) => url.stats)
  @JoinColumn({ name: "short_url_id" })
  shortUrl!: ShortUrlOrmEntity;

  @Column({ name: "access_count", default: 0 })
  accessCount!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt!: Date | null;
}
