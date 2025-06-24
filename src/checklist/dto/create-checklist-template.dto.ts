import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChecklistTemplateDto {
    @ApiProperty({ description: 'Title of the checklist template' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'Optional description of the checklist template' })
    @IsOptional()
    @IsString()
    description?: string;
}
