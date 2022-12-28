import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'todo',
})
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  desc: string;

  @Column({
    default: false,
  })
  completed: boolean;
}
