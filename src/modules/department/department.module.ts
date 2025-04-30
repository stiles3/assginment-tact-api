import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { SubDepartment } from './sub-department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
