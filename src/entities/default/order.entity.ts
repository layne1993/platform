import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Goods } from './goods.entity';
import { DefaultUser } from './user.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  code: string;

  @Column()
  tradeCode: string;

  @Column()
  price: string;

  @ManyToMany(() => Goods, (goods) => goods.orders)
  @JoinTable({
    name: 'order_goods',
    joinColumns: [{ name: 'order_id' }],
    inverseJoinColumns: [{ name: 'goods_id' }],
  })
  goods: Goods[];

  @ManyToOne(() => DefaultUser, (user) => user.orders)
  user: DefaultUser;

  @CreateDateColumn()
  createDate?: Timestamp;

  @UpdateDateColumn()
  updateDate?: Timestamp;

  @Column({ type: 'timestamp', name: 'tradeDate', default: null })
  tradeDate?: Date;
}
