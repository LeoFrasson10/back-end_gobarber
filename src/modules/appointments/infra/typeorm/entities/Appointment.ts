import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

/*
*Relacionamento:
*1 para 1 (OneToOne)
*1 para muitos (OneToMany)
*muitos para muitos (ManyToMany)
*/

//parametro da class
@Entity('appointments')
class Appointment {
  //definindo as colunas 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp')
  date: Date;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

}

export default Appointment;
