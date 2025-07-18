import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // --- REGISTRO DE UN NUEVO USUARIO ---
  async signUp(createUserDto: any) {
    // Simplemente llamamos al método 'create' del servicio de usuarios
    return this.usersService.create(createUserDto);
  }

  // --- INICIO DE SESIÓN ---
async signIn(email: string, pass: string) {
  // 1. Buscamos al usuario por su email
  const user = await this.usersService.findOneByEmail(email);

  // --- CAMBIO AQUÍ ---
  // Si el usuario no existe, lanzamos el error inmediatamente
  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // 2. Comparamos la contraseña (ahora TypeScript sabe que 'user' no es null)
  const isMatch = await bcrypt.compare(pass, user.password);

  // 3. Si no coinciden, lanzamos un error
  if (!isMatch) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

    // 4. Si todo está bien, creamos el "payload" del token
    const payload = { sub: user.id, email: user.email, role: user.role };

    // 5. Firmamos y devolvemos el token de acceso
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}