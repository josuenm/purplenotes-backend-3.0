import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

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

  @Column({ type: "jsonb", nullable: false })
  accountConfirmation: {
    email: string;
    isUsed: boolean;
  };

  constructor() {
    if (!this.created_at) {
      this.created_at = new Date();
    }
    if (!this.id) {
      this.id = uuid();
    }
    this.updated_at = new Date();
  }
}

export { User };
