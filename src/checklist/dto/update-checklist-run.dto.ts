import { PartialType } from "@nestjs/swagger";
import CreateChecklistRunDto from "./create-checklist-run.dto";

export default class UpdateChecklistRunDto extends PartialType(CreateChecklistRunDto) {}