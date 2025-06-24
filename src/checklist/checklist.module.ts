import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ChecklistTemplateController } from "./checklist-template/checklist-template.controller";
import { ChecklistTemplateService } from "./checklist-template/checklist-template.service";
import { DatabaseModule } from "../database/database.module";
import { ChecklistTemplate, TemplateTask, RunTask, ChecklistRun } from "../database/entities";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TemplateTaskService } from './template-task/template-task.service';
import { RunTaskService } from './run-task/run-task.service';
import { ChecklistRunService } from './checklist-run/checklist-run.service';
import { ChecklistRunController } from "./checklist-run/checklist-run.controller";
import { RunTaskController } from "./run-task/run-task.controller";
import { TemplateTaskController } from "./template-task/template-task.controller";
import { InternalConfigModule } from "../internal-config/internal-config.module";

@Module({
    imports: [
        InternalConfigModule
    ],
    controllers: [
        ChecklistTemplateController,
        ChecklistRunController,
        RunTaskController,
        TemplateTaskController
    ],
    providers: [
        ChecklistTemplateService,
        TemplateTaskService, RunTaskService, ChecklistRunService
    ],
    exports: []
})
export default class ChecklistModule {}