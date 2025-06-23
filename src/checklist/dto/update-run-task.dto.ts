import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import CreateRunTaskDto from "./create-run-task.dto";

export default class UpdateRunTaskDto extends PartialType(CreateRunTaskDto) {
    @ApiProperty()
    @IsOptional()
    completed?: boolean;
}