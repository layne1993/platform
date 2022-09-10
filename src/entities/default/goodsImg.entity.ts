import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToOne,
} from 'typeorm';
import { Goods } from './goods.entity';

@Entity('goodsImg')
export class GoodsImg {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  url: string;

  @ManyToOne(() => Goods, (goods) => goods.imgs)
  goods: Goods;

  @CreateDateColumn()
  createDate?: Timestamp;

  @UpdateDateColumn()
  updateDate?: Timestamp;
}
