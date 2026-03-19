import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("short_urls")
export class ShortUrlMongoEntity {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  code!: string;

  @Column()
  originalUrl!: string;

  @Column()
  shortUrl!: string;

  @Column()
  createdAt!: Date;
}
