import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import { AdminUser } from './user.entity';

@Entity('adminRole')
export class AdminRole {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ type: 'text', default: null })
  description?: string;

  @Column({ type: 'int', default: 1 })
  weight?: number;

  @OneToMany(() => AdminUser, (user) => user.role)
  users: AdminUser[];

  @CreateDateColumn()
  createDate?: Timestamp;

  @UpdateDateColumn()
  updateDate?: Timestamp;
}
