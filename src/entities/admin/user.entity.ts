import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminRole } from './role.entity';
import { BusinessException } from 'src/common/exceptions/business.exception';

export enum UserStatus {
  disabled = 'disabled',
  enabled = 'enabled',
}

@Entity('adminUser')
export class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  mobile: string;

  @Column({ default: null })
  email?: string;

  @ManyToOne(() => AdminRole, (role) => role.users)
  role: AdminRole;

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
