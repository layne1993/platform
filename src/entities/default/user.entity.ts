import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Goods } from './goods.entity';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { Order } from './order.entity';

export enum UserStatus {
  disabled = 'disabled',
  enabled = 'enabled',
}

@Entity('defaultUser')
export class DefaultUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  mobile: string;

  @Column()
  avatar: string;

  @Column({ default: null })
  email?: string;

  @OneToMany(() => Goods, (good) => good.saleman)
  saleGoods: Goods[];

  @ManyToMany(() => Goods, (good) => good.buyers)
  tradeGoods: Goods[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.enabled,
  })
  status?: string;

  @CreateDateColumn()
  createDate?: Timestamp;

  @UpdateDateColumn()
  updateDate?: Timestamp;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPwd(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hashSync(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new BusinessException('密码转换错误');
      }
    }
  }
}
