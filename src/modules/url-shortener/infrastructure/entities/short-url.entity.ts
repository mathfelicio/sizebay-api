import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("short_urls")
export class ShortUrlEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  originalUrl!: string;

  @Column()
  shortUrl!: string;

  @Column()
  createdAt!: Date;
}
