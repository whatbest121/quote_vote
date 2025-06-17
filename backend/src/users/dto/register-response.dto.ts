
import { ApiProperty } from '@nestjs/swagger';


export class RegisterResponseDto {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
    
    @ApiProperty()
    _id: string

    @ApiProperty()
    __v: number
}
