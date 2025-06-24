import { PartialType } from "@nestjs/swagger";
import CreateTemplateTaskDto from "./create-template-task.dto";

export default class UpdateTemplateTaskDto extends PartialType(CreateTemplateTaskDto) {}