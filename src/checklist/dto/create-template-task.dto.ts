import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateTemplateTaskDto {
    @ApiProperty({ description: 'Description of the template task' })
    @IsString()
    description: string;

    @ApiPropertyOptional({ description: 'Order of the task in the checklist', type: Number })
    @IsOptional()
    order?: number;

    @ApiProperty({ description: 'ID of the checklist template' })
    @IsString()
    checklistTemplateId: string;
}