import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export default class CreateChecklistRunDto {

    @ApiProperty({ description: "Title of the checklist run" })
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: "Optional description of the checklist run" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: "ID of the checklist template" })
    @IsString()
    checklistTemplateId: string;

    @ApiProperty({ description: "ID of the user" })
    @IsString()
    userId: string;
    
    @ApiPropertyOptional({
        description: "Status of the checklist run",
        enum: ['pending', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    })
    @IsOptional()
    @IsString()
    status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}