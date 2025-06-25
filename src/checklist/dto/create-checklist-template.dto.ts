import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateChecklistTemplateDto {
    @ApiProperty({ description: 'Title of the checklist template' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'Optional description of the checklist template' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Order of the checklist template' })
    order: boolean;

}
