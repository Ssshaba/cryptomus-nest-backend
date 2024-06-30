import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto, LoginUserDTO } from "../../common/dto/user";
import { TokenService } from "../token/token.service";
import { User } from "@prisma/client";
import { AppErrors } from "../../common/errors";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public async registerUser(dto: CreateUserDto){
    const newUser = await this.usersService.createUser(dto);

    const payload = {
      email: dto.email,
    }

    const token = await this.tokenService.generateJwtToken(payload)

    return {...newUser, token}
  }

  public async ligin(dto:LoginUserDTO){

    const user = await  this.usersService.getUserByEmail(dto.email);

    if (!user) return new BadRequestException(AppErrors.USER_NOT_FOUND);

    const checkPassword = await bcrypt.compare(dto.password, user.password)

    if (!checkPassword) return new BadRequestException(AppErrors.INVALID_PASSWORD);

    const payload = {
      email: dto.email,
    };

    const token = await this.tokenService.generateJwtToken(payload)
  }
}
