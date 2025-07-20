import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './decorators/public.decorator'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Decorador personalizado para marcar esta ruta como pública
   @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) { // <-- USAR EL DTO
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK) // Por defecto POST devuelve 201, lo cambiamos a 200 (OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}