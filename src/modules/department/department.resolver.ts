import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentOneResponse } from './response/department-one.response';
import { PaginationDto } from './dto/pagination.dto';
import { DepartmentsResponse } from './response/departments.response';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';
import { CreateSubDepartmentDto } from './dto/create-sub-department.dto';
import { UpdateSubDepartmentDto } from './dto/update-sub-department.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../user/guards';

@Resolver(() => DepartmentOneResponse)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => DepartmentOneResponse)
  @UseGuards(AuthGuard)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentDto,
  ) {
    return await this.departmentService.createDepartment(createDepartmentInput);
  }
  @Mutation(() => DepartmentOneResponse)
  @UseGuards(AuthGuard)
  async updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentDto,
  ) {
    return await this.departmentService.updateDepartment(updateDepartmentInput);
  }
  @Mutation(() => DepartmentOneResponse)
  @UseGuards(AuthGuard)
  async deleteDepartment(
    @Args('deleteDepartmentInput') deleteDepartmentInput: DeleteDepartmentDto,
  ) {
    return await this.departmentService.deleteDepartment(deleteDepartmentInput);
  }
  @Mutation(() => DepartmentOneResponse)
  @UseGuards(AuthGuard)
  async addSubDepartment(
    @Args('createSubDepartmentInput')
    createSubDepartmentInput: CreateSubDepartmentDto,
  ) {
    return await this.departmentService.addSubDepartment(
      createSubDepartmentInput,
    );
  }
  @Mutation(() => DepartmentOneResponse)
  @UseGuards(AuthGuard)
  async updateSubDepartment(
    @Args('updateSubDepartmentInput')
    updateSubDepartmentInput: UpdateSubDepartmentDto,
  ) {
    return await this.departmentService.updateSubDepartment(
      updateSubDepartmentInput,
    );
  }
  @Mutation(() => DepartmentOneResponse)
  @UseGuards(AuthGuard)
  async deleteSubDepartment(
    @Args('deleteDepartmentInput') deleteDepartmentInput: DeleteDepartmentDto,
  ) {
    return await this.departmentService.deleteSubDepartment(
      deleteDepartmentInput,
    );
  }

  @Query(() => DepartmentsResponse)
  @UseGuards(AuthGuard)
  async loadDepartments(@Args('pagination') paginationInput: PaginationDto) {
    let response =
      await this.departmentService.loadDepartments(paginationInput);
    console.log(JSON.stringify(response));
    return response;
  }
}
