import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistTemplateService } from './checklist-template.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistTemplate } from '../../database/entities';

describe('ChecklistTemplateService', () => {
  let service: ChecklistTemplateService;

  const mockChecklistTemplateRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistTemplateService,
        {
          provide: getRepositoryToken(ChecklistTemplate),
          useValue: mockChecklistTemplateRepo,
        },
      ],
    }).compile();

    service = module.get<ChecklistTemplateService>(ChecklistTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a checklist template', async () => {
      const dto = { name: 'Test Template' };
      const created = { ...dto };
      const saved = { id: '1', ...dto };

      mockChecklistTemplateRepo.create.mockReturnValue(created);
      mockChecklistTemplateRepo.save.mockResolvedValue(saved);

      const result = await service.create(dto as any);

      expect(mockChecklistTemplateRepo.create).toHaveBeenCalledWith(dto);
      expect(mockChecklistTemplateRepo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(saved);
    });
  });

  describe('findAll', () => {
    it('should return all checklist templates for a user', async () => {
      const userId = 'user-1';
      const templates = [{ id: '1', user: { id: userId } }];
      mockChecklistTemplateRepo.find.mockResolvedValue(templates);

      const result = await service.findAll(userId);

      expect(mockChecklistTemplateRepo.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['tasks', 'checklistRuns'],
      });
      expect(result).toEqual(templates);
    });
  });

  describe('findOne', () => {
    it('should return a checklist template by id', async () => {
      const id = '1';
      const template = { id };
      mockChecklistTemplateRepo.findOne.mockResolvedValue(template);

      const result = await service.findOne(id);

      expect(mockChecklistTemplateRepo.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['tasks', 'checklistRuns'],
      });
      expect(result).toEqual(template);
    });

    it('should throw if checklist template not found', async () => {
      mockChecklistTemplateRepo.findOne.mockResolvedValue(undefined);

      await expect(service.findOne('notfound')).rejects.toThrow('Checklist template with id notfound not found');
    });
  });

  describe('update', () => {
    it('should update and save a checklist template', async () => {
      const id = '1';
      const existing = { id, name: 'Old' };
      const dto = { name: 'New' };
      const updated = { id, name: 'New' };

      mockChecklistTemplateRepo.findOne.mockResolvedValue(existing);
      mockChecklistTemplateRepo.save.mockResolvedValue(updated);

      const result = await service.update(id, dto as any);

      expect(mockChecklistTemplateRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(mockChecklistTemplateRepo.save).toHaveBeenCalledWith({ ...existing, ...dto });
      expect(result).toEqual(updated);
    });

    it('should throw if checklist template to update not found', async () => {
      mockChecklistTemplateRepo.findOne.mockResolvedValue(undefined);

      await expect(service.update('notfound', {} as any)).rejects.toThrow('Checklist template with id notfound not found');
    });
  });

  describe('remove', () => {
    it('should remove a checklist template', async () => {
      const id = '1';
      const template = { id };
      mockChecklistTemplateRepo.findOne.mockResolvedValue(template);
      mockChecklistTemplateRepo.remove.mockResolvedValue(template);

      const result = await service.remove(id);

      expect(mockChecklistTemplateRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(mockChecklistTemplateRepo.remove).toHaveBeenCalledWith(template);
      expect(result).toEqual(template);
    });

    it('should throw if checklist template to remove not found', async () => {
      mockChecklistTemplateRepo.findOne.mockResolvedValue(undefined);

      await expect(service.remove('notfound')).rejects.toThrow('Checklist template with id notfound not found');
    });
  });
});
