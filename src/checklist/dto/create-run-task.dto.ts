import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateRunTaskDto {
    @ApiProperty({ description: 'Description of the task' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'ID of the checklist run' })
    @IsString()
    checklistRunId: string;
}