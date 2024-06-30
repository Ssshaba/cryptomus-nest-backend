import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDTO } from "../../common/dto/user";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public registerUser(@Body() dto: CreateUserDto){

    return this.authService.registerUser(dto);
  }

  @Post('login')
  public loginUser (@Body() dto: LoginUserDTO){
    return this.authService.ligin(dto)
  }

}
