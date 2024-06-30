import { IsString } from "class-validator";

export class CreateUserDto {

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

}

export class LoginUserDTO {

  @IsString()
  email: string;

  @IsString()
  password: string;
}