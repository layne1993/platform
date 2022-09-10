import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

export enum TypeStatus {
  pc = 0,
}

export enum Status {
  disabled = 'disabled',
  enabled = 'enabled',
}

@Entity('banner')
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: TypeStatus,
    default: TypeStatus.pc,
  })
  type?: number;

  @Column()
  img: string;

  @Column()
  link: string;

  @Column()
  sort?: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.enabled,
  })
  status?: string;

  @CreateDateColumn()
  createDate?: Timestamp;

  @UpdateDateColumn()
  updateDate?: Timestamp;
}
