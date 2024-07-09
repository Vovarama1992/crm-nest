import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { UserDto, CheckUserDto } from './types/dto';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiBody({ type: UserDto })
  @ApiBearerAuth()
  @Post('register')
  async register(@Req() req: Request, @Body() userDto: UserDto) {
    const decoded = this.authService.authenticate(req);
    if (decoded.roleName !== 'Директор') {
      throw new ForbiddenException(
        'You do not have permission to register a new user',
      );
    }
    return this.userService.register(userDto);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @ApiBody({ type: CheckUserDto })
  @Post('login')
  async login(@Body() checkUserDto: CheckUserDto) {
    return this.authService.login(checkUserDto);
  }

  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({
    status: 200,
    description: 'The user role has been successfully updated.',
  })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiBody({ schema: { example: { roleName: 'admin' } } })
  @Put(':id/role')
  async updateUserRole(
    @Param('id') id: number,
    @Body('roleName') roleName: string,
  ) {
    return this.userService.updateUserRole(id, roleName);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth()
  @Get('me')
  async getUser(@Req() req: Request) {
    const decoded = this.authService.authenticate(req);
    const userId = parseInt(decoded.sub, 10);
    return this.userService.getUserById(userId);
  }
}
