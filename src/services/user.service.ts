import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserDto } from '../types/dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany();
  }
  async register(userDto: UserDto) {
    const { email, password, roleName, ...rest } = userDto;

    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleName,
        ...rest,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      roleName: user.roleName,
    };
  }

  async updateUserRole(userId: number, roleName: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { roleName },
    });
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const {
      see_self,
      summary_table,
      departures,
      salary_reports_himself,
      salary_reports_common,
      salary_reports_sellers,
      finances,
      my_sales,
      common_sales,
      suppliers,
      procurements,
    } = user.role;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      roleName: user.roleName,
      permissions: {
        see_self,
        summary_table,
        departures,
        salary_reports_himself,
        salary_reports_common,
        salary_reports_sellers,
        finances,
        my_sales,
        common_sales,
        suppliers,
        procurements,
      },
    };
  }
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }
}
