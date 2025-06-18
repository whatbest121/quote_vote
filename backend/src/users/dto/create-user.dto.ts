import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'admin' })
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain letters and numbers',
    })
    password: string;
}
