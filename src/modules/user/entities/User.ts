import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;

  constructor() {
    if (!this.created_at) {
      this.created_at = new Date();
    }
    if (!this.token) {
      this.token = uuid();
    }
    this.updated_at = new Date();
  }
}

export { User };
