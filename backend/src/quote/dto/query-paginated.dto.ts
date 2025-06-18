import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class PaginateQueryDto {
    @ApiPropertyOptional({ description: 'Search keyword for quote or user_id' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ default: '1', description: 'Page number' })
    @IsOptional()
    @IsNumberString()
    page?: string;

    @ApiPropertyOptional({ default: '10', description: 'Items per page' })
    @IsOptional()
    @IsNumberString()
    limit?: string;

    @ApiPropertyOptional({
        default: 'createdAt',
        description: 'Field to sort by (e.g., createdAt, vote)',
    })
    @IsOptional()
    @IsString()
    sort?: string;
}
