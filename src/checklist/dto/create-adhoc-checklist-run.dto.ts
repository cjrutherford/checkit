
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export default class CreateAdhocChecklistRunDto {
    @ApiProperty({ description: 'Title of the ad-hoc checklist run' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'Optional description of the ad-hoc checklist run' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ type: [String], description: 'List of task descriptions for the ad-hoc checklist' })
    @IsArray()
    @IsString({ each: true })
    tasks: string[];
}
