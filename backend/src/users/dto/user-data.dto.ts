import { ApiProperty } from "@nestjs/swagger"
import { UserDocument } from "src/auth/user.schema"

export class UserData {
    @ApiProperty()
    username: string

    @ApiProperty()
    _id: string
}