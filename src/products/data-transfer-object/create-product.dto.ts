import { IsArray, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsString, MaxLength, MinLength } from "class-validator";


export class DTO_CreateProductSchema {
    // https://github.com/typestack/class-validator
    // https://docs.nestjs.com/techniques/validation
    @IsNotEmpty()
    @IsNumber()
    // @IsNumberString()
    readonly id: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(25)
    readonly name: string;
    @IsNotEmpty()
    @IsInt()
    readonly qty: number;
    @IsNotEmpty()
    @IsNumber()
    readonly price: number
    @IsNotEmpty()
    @IsObject()
    readonly testobject: any
    @IsNotEmpty()
    @IsArray()
    readonly testarray: any
    @IsNotEmpty()
    @IsDateString()
    readonly testdate: Date;
}