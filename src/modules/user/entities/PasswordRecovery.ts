import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("password_recoveries")
class PasswordRecovery {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  user: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  isUsed: boolean;

  @Column({ nullable: false })
  expiryDate: Date;

  @Column({ nullable: false })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    if (!this.expiryDate) {
      const currentDate = new Date();
      const expirationDate = new Date(currentDate);
      expirationDate.setDate(expirationDate.getDate() + 1);

      this.expiryDate = expirationDate;
    }
  }
}

export { PasswordRecovery };
