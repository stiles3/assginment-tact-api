import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { SubDepartment } from './sub-department.entity';
import {
  DepartmentOneData,
  DepartmentOneResponse,
} from './response/department-one.response';
import { DeleteDepartmentDto } from './dto/delete-department.dto';
import { PaginationDto } from './dto/pagination.dto';
import { DepartmentsResponse } from './response/departments.response';
import { CreateSubDepartmentDto } from './dto/create-sub-department.dto';
import { UpdateSubDepartmentDto } from './dto/update-sub-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepo: Repository<SubDepartment>,
  ) {}

  typescript;
  private createSuccessResponse<T>(
    message: string,
    data: DepartmentOneData | null = null,
  ): DepartmentOneResponse {
    const response = new DepartmentOneResponse();
    response.status = true;
    response.message = message;
    response.data = data;
    return response;
  }

  async createDepartment(
    createDepartmentInput: CreateDepartmentDto,
  ): Promise<DepartmentOneResponse> {
    const { name, subDepartments } = createDepartmentInput;

    const department = this.departmentRepo.create({
      name,
      subDepartments,
    });

    const savedDepartment = await this.departmentRepo.save(department);
    return this.createSuccessResponse('Department created', savedDepartment);
  }

  async updateDepartment(
    updateDepartmentInput: UpdateDepartmentDto,
  ): Promise<DepartmentOneResponse> {
    const { name, id } = updateDepartmentInput;

    const existingDepartment = await this.departmentRepo.findOneBy({ id });
    if (!existingDepartment) {
      throw new NotFoundException('Department not found');
    }

    await this.departmentRepo.update(id, { name });
    const updatedDepartment = await this.departmentRepo.findOneByOrFail({ id });

    return this.createSuccessResponse('Department updated', {
      subDepartments: updatedDepartment.subDepartments,
      name: updatedDepartment.name,
      id: updatedDepartment.id,
    });
  }

  async deleteDepartment(
    deleteDepartmentInput: DeleteDepartmentDto,
  ): Promise<DepartmentOneResponse> {
    const { id } = deleteDepartmentInput;

    const existingDepartment = await this.departmentRepo.findOne({
      where: { id },
      relations: ['subDepartments'], // Load sub-departments
    });

    if (!existingDepartment) {
      throw new NotFoundException('Department not found');
    }

    await this.departmentRepo.remove(existingDepartment); // This will cascade delete

    return this.createSuccessResponse('Department deleted');
  }

  async loadDepartments(
    paginationInput: PaginationDto,
  ): Promise<DepartmentsResponse> {
    const { limit, page } = paginationInput;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.departmentRepo.find({
        skip,
        take: limit,
        loadEagerRelations: true,
        relations: ['subDepartments'],
      }),
      this.departmentRepo.count(),
    ]);

    const response = new DepartmentsResponse();
    response.status = true;
    response.message = 'Departments fetched';
    response.data = {
      departments: data,
      meta: { limit, page, total },
    };

    return response;
  }

  async addSubDepartment(
    createSubDepartmentInput: CreateSubDepartmentDto,
  ): Promise<DepartmentOneResponse> {
    const { name, departmentId } = createSubDepartmentInput;

    const department = await this.departmentRepo.findOneBy({
      id: departmentId,
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const subDepartment = this.subDepartmentRepo.create({ name, department });
    await this.subDepartmentRepo.save(subDepartment);

    return this.createSuccessResponse('Sub department created');
  }

  async updateSubDepartment(
    updateSubDepartmentInput: UpdateSubDepartmentDto,
  ): Promise<DepartmentOneResponse> {
    const { name, id } = updateSubDepartmentInput;

    const existingSubDepartment = await this.subDepartmentRepo.findOneBy({
      id,
    });
    if (!existingSubDepartment) {
      throw new NotFoundException('Sub-department not found');
    }

    await this.subDepartmentRepo.update(id, { name });
    const updatedSubDepartment = await this.subDepartmentRepo.findOneByOrFail({
      id,
    });

    return this.createSuccessResponse('Sub department updated', {
      id: updatedSubDepartment.id.toString(),
      name: updatedSubDepartment.name,
    });
  }

  async deleteSubDepartment(
    deleteDepartmentInput: DeleteDepartmentDto,
  ): Promise<DepartmentOneResponse> {
    const { id } = deleteDepartmentInput;
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid sub-department ID');
    }

    const existingSubDepartment = await this.subDepartmentRepo.findOneBy({
      id: Number(id),
    });

    if (!existingSubDepartment) {
      throw new NotFoundException('Sub-department not found');
    }

    const deleteResult = await this.subDepartmentRepo.delete(Number(id));
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Sub-department not found');
    }

    return this.createSuccessResponse('Sub-department deleted');
  }
}
