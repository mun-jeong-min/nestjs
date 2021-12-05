import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ unique: true })
  id: string;

  @Column()
  password: string;

  @Column()
  username: string;
}
