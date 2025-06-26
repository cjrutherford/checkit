import { ChecklistRun, ChecklistTemplate, RunTask, TemplateTask } from "../database/entities";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { ChecklistRunController } from "./checklist-run/checklist-run.controller";
import { ChecklistRunService } from './checklist-run/checklist-run.service';
import { ChecklistTemplateController } from "./checklist-template/checklist-template.controller";
import { ChecklistTemplateService } from "./checklist-template/checklist-template.service";
import { DataSource } from "typeorm";
import { DatabaseModule } from "../database/database.module";
import { InternalConfigModule } from "../internal-config/internal-config.module";
/**
 * Module for checklist features, including templates, runs, and tasks.
 * Bundles controllers and services for checklist management.
 */
import { Module } from "@nestjs/common";
import { RunTaskController } from "./run-task/run-task.controller";
import { RunTaskService } from './run-task/run-task.service';
import { TemplateTaskController } from "./template-task/template-task.controller";
import { TemplateTaskService } from './template-task/template-task.service';
import { getRepositoryToken } from "@nestjs/typeorm";

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