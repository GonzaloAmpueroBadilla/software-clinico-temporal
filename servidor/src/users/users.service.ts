import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) { // Usamos 'any' por ahora, luego crearemos el DTO
    const { email, password, full_name, role } = createUserDto;

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      full_name,
      role,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      // Maneja el error si el email ya existe
      if (error.code === '23505') { 
        throw new ConflictException('El correo electrónico ya está en uso.');
      }
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    return this.userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password') // <-- Le decimos que AÑADA la contraseña a la selección
    .getOne();
  }
}