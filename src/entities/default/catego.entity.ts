import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
} from 'typeorm';
import { Goods } from './goods.entity';

@Entity('catego')
export class Catego {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @OneToMany(() => Goods, (good) => good.catego)
  goods: Goods[];

  @CreateDateColumn()
  createDate?: Timestamp;

  @UpdateDateColumn()
  updateDate?: Timestamp;
}
