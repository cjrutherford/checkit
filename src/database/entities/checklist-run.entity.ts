import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ChecklistTemplate from "./checklist-template.entity";
import RunTask from "./run-task.entity";

export enum ChecklistRunStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

@Entity()
export default class ChecklistRun {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: ChecklistRunStatus, default: ChecklistRunStatus.PENDING })
    status: ChecklistRunStatus;

    @ManyToOne(() => ChecklistTemplate, checklistTemplate => checklistTemplate.checklistRuns)
    checklistTemplate: ChecklistTemplate;

    @Column()
    userId: string;

    @Column({ type: 'timestamp', nullable: true })
    completedAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => RunTask, rt => rt.checklistRun)
    tasks: RunTask[];

}