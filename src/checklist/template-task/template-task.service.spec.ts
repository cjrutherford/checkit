import { Test, TestingModule } from '@nestjs/testing';
import { TemplateTaskService } from './template-task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TemplateTask } from '../../database/entities';

describe('TemplateTaskService', () => {
  let service: TemplateTaskService;

  const mockTemplateTaskRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateTaskService,
        {
          provide: getRepositoryToken(TemplateTask),
          useValue: mockTemplateTaskRepo,
        },
      ],
    }).compile();

    service = module.get<TemplateTaskService>(TemplateTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save and return the created template task', async () => {
      const dto = { name: 'Task 1' };
      const savedTask = { id: '1', ...dto };
      mockTemplateTaskRepo.save.mockResolvedValue(savedTask);

      const result = await service.create(dto as any);

      expect(mockTemplateTaskRepo.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(savedTask);
    });
  });

  describe('findAll', () => {
    it('should return all template tasks for a templateId', async () => {
      const templateId = 'template-1';
      const tasks = [{ id: '1' }, { id: '2' }];
      mockTemplateTaskRepo.find.mockResolvedValue(tasks);

      const result = await service.findAll(templateId);

      expect(mockTemplateTaskRepo.find).toHaveBeenCalledWith({
        where: { checklistTemplate: { id: templateId } },
        order: { order: 'ASC' },
      });
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return the template task if found', async () => {
      const id = '1';
      const task = { id };
      mockTemplateTaskRepo.findOne.mockResolvedValue(task);

      const result = await service.findOne(id);

      expect(mockTemplateTaskRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(task);
    });

    it('should throw an error if template task not found', async () => {
      mockTemplateTaskRepo.findOne.mockResolvedValue(undefined);

      await expect(service.findOne('not-found')).rejects.toThrow('TemplateTask with id not-found not found');
    });
  });

  describe('update', () => {
    it('should update and return the updated template task', async () => {
      const id = '1';
      const dto = { name: 'Updated Task' };
      const updatedTask = { id, ...dto };
      mockTemplateTaskRepo.update.mockResolvedValue(undefined);
      jest.spyOn(service, 'findOne').mockResolvedValue(updatedTask as any);

      const result = await service.update(id, dto as any);

      expect(mockTemplateTaskRepo.update).toHaveBeenCalledWith(id, dto);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should delete the template task if found', async () => {
      mockTemplateTaskRepo.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await expect(service.remove('1')).resolves.toBeUndefined();
      expect(mockTemplateTaskRepo.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if template task not found', async () => {
      mockTemplateTaskRepo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(service.remove('not-found')).rejects.toThrow('TemplateTask with id not-found not found');
    });
  });
});
