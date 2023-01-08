import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ERole } from 'src/auth/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Role',
})
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ERole,
  })
  name: string;
}
