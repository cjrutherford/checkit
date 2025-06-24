import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import ChecklistRun from "./checklist-run.entity";

@Entity()
export default class RunTask {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @ManyToOne(() => ChecklistRun, checklistRun => checklistRun.tasks)
    checklistRun: ChecklistRun;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @Column({ type: 'timestamp', nullable: true })
    completedAt?: Date;
}