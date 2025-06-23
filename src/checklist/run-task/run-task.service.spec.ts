import { Test, TestingModule } from '@nestjs/testing';
import { RunTaskService } from './run-task.service';
import { RunTask } from '../../database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RunTaskService', () => {
  let service: RunTaskService;

  const mockRunTaskRepo = {
    create: jest.fn().mockImplementation(dto => dto),
    update: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RunTaskService,
        {
          provide: getRepositoryToken(RunTask),
          useValue: mockRunTaskRepo,
        },
      ],
    }).compile();

    service = module.get<RunTaskService>(RunTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save and return the created RunTask', async () => {
      const dto = { name: 'Task 1' } as any;
      const savedTask = { id: '1', ...dto } as any;
      mockRunTaskRepo.save.mockResolvedValue(savedTask);

      const result = await service.create(dto);

      expect(mockRunTaskRepo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(savedTask);
    });
  });

  describe('findAll', () => {
    it('should return all RunTasks for a checklistRunId', async () => {
      const checklistRunId = 'abc123';
      const tasks = [{ id: '1' }, { id: '2' }] as any;
      mockRunTaskRepo.find.mockResolvedValue(tasks);

      const result = await service.findAll(checklistRunId);

      expect(mockRunTaskRepo.find).toHaveBeenCalledWith({
        where: { checklistRun: { id: checklistRunId } },
      });
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return the RunTask if found', async () => {
      const id = '1';
      const task = { id } as any;
      mockRunTaskRepo.findOne.mockResolvedValue(task);

      const result = await service.findOne(id);

      expect(mockRunTaskRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(task);
    });

    it('should throw an error if RunTask not found', async () => {
      const id = 'notfound';
      mockRunTaskRepo.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(id)).rejects.toThrow(`RunTask with id ${id} not found`);
    });
  });

  describe('update', () => {
    it('should update and return the updated RunTask', async () => {
      const id = '1';
      const dto = { name: 'Updated' } as any;
      const updatedTask = { id, ...dto } as any;
      mockRunTaskRepo.update = jest.fn().mockResolvedValue({ affected: 1 });
      mockRunTaskRepo.findOne.mockResolvedValue(updatedTask);

      const result = await service.update(id, dto);

      expect(mockRunTaskRepo.update).toHaveBeenCalledWith(id, dto);
      expect(mockRunTaskRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should remove the RunTask if found', async () => {
      const id = '1';
      mockRunTaskRepo.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await expect(service.remove(id)).resolves.toBeUndefined();
      expect(mockRunTaskRepo.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error if RunTask not found', async () => {
      const id = 'notfound';
      mockRunTaskRepo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(service.remove(id)).rejects.toThrow(`RunTask with id ${id} not found`);
    });
  });
});
