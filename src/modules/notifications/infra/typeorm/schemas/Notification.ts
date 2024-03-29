import {ObjectID, Entity, UpdateDateColumn, CreateDateColumn, Column, ObjectIdColumn} from 'typeorm';

@Entity('notifications')//nome do schema(tabela)
class Notification{
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false})
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;