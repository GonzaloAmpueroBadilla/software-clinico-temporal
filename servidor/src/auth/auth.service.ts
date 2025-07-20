import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // <-- IMPORTAR DTO

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // --- REGISTRO DE UN NUEVO USUARIO ---
  async signUp(createUserDto: CreateUserDto) { // <-- USAR EL DTO CORRECTO
    return this.usersService.create(createUserDto);
  }

  // --- INICIO DE SESIÓN ---
  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}