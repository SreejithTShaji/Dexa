import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsInt } from "class-validator";
import { Type } from "class-transformer";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name!: string;
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "Invalid email format" })
  email?: string;
}

export class IdParamDto {
  @IsInt({ message: "ID must be a number" })
  @Type(() => Number)
  id!: number;
}
