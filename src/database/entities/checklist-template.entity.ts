import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./user.entity";
import ChecklistRun from "./checklist-run.entity";
import TemplateTask from "./template-task.entity";

@Entity()
export default class ChecklistTemplate {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => UserEntity, user => user.checklistTemplates)
    user: UserEntity;

    @Column()
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @OneToMany(() => TemplateTask, task => task.checklistTemplate)
    tasks: TemplateTask[];

    @OneToMany(() => ChecklistRun, checklistRun => checklistRun.checklistTemplate)
    checklistRuns: ChecklistRun[];
}
