import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("notes")
class Note {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false, unique: true })
  token: string;

  @Column({ type: "boolean", nullable: false })
  privacy: boolean;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;

  @Column({ nullable: false })
  author: string;

  constructor() {
    if (!this.token) {
      this.token = uuid();
    }
  }
}

export { Note };
