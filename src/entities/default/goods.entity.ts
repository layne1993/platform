import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Catego } from './catego.entity';
import { GoodsImg } from './goodsImg.entity';
import { Order } from './order.entity';
import { DefaultUser } from './user.entity';

export enum GoodsStatus {
  disabled = 'disabled',
  enabled = 'enabled',
}

export enum PublishStatus {
  unpublish = 0,
  publish = 1,
}

@Entity('goods')
export class Goods {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column({ default: null })
  description?: string;

  @Column()
  thumb: string;

  @Column()
  price: string;

  @ManyToOne(() => DefaultUser, (user) => user.saleGoods)
  saleman: DefaultUser;

  @ManyToMany(() => DefaultUser, (user) => user.tradeGoods)
  @JoinTable({
    name: 'trade_good',
    joinColumns: [{ name: 'good_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  buyers: DefaultUser[];

  @ManyToMany(() => Order, (order) => order.goods)
  orders: Order[];

  @Column({ default: '自营' })
  source?: string;

  @Column({ type: 'int', default: 0 })
  count?: number;

  @Column({ type: 'int', default: 0 })
  tradeCount?: number;

  @Column({ type: 'int', default: 0 })
  changedCount?: number;

  @Column({ type: 'int', default: 0 })
  changedTradeCount?: number;

  @OneToMany(() => GoodsImg, (goodImg) => goodImg.goods)
  imgs?: GoodsImg[];

  @CreateDateColumn()
  createDate?: Timestamp;

  @UpdateDateColumn()
  updateDate?: Timestamp;

  @Column({ type: 'timestamp', name: 'tradeDate', default: null })
  shelvesDate?: Date;

  @Column({
    type: 'enum',
    enum: GoodsStatus,
    default: GoodsStatus.enabled,
  })
  status?: string;

  @Column({
    type: 'enum',
    enum: PublishStatus,
    default: PublishStatus.unpublish,
  })
  published?: number;

  @ManyToOne(() => Catego, (catego) => catego.goods)
  catego: Catego;
}
