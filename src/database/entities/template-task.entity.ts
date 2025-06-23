import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ChecklistTemplate from "./checklist-template.entity";

@Entity()
export default class TemplateTask {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    order?: number;

    @ManyToOne(() => ChecklistTemplate, ct => ct.tasks)
    checklistTemplate: ChecklistTemplate;
}