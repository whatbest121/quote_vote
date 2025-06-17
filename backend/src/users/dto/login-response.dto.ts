
import { ApiProperty } from '@nestjs/swagger';
import { UserData } from './user-data.dto';


export class LoginResponseDto {
    @ApiProperty()
    token: string

    @ApiProperty({ type: UserData })
    userData: UserData
}
