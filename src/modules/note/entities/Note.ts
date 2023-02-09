import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("notes")
class Note {
  @PrimaryColumn()
  id: string;

  @Column({ type: "boolean", nullable: false })
  privacy: boolean;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  updatedAt: Date;

  @Column({ nullable: false })
  author: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }
}

export { Note };
