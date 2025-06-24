import { Test, TestingModule } from '@nestjs/testing';
import { TemplateTaskController } from './template-task.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenEntity } from '../../database/entities';
import { TemplateTaskService } from './template-task.service';

describe('TemplateTaskController', () => {
  let controller: TemplateTaskController;

  const mockTokenRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  }

  const mockTemplateTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateTaskController],
      providers: [{
        provide: getRepositoryToken(TokenEntity),
        useValue: mockTokenRepo,
      },{
        provide: TemplateTaskService,
        useValue: mockTemplateTaskService,
      }],
    }).compile();

    controller = module.get<TemplateTaskController>(TemplateTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTempateTask', () => {
    it('should call service.create with correct dto and return the result', async () => {
      const dto = { name: 'Task 1', templateId: 'template-1' };
      const result = { id: '1', ...dto };
      mockTemplateTaskService.create.mockResolvedValue(result);

      const response = await controller.createTempateTask(dto as any);
      expect(mockTemplateTaskService.create).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with templateId and return the result', async () => {
      const templateId = 'template-1';
      const result = [{ id: '1', name: 'Task 1', templateId }];
      mockTemplateTaskService.findAll.mockResolvedValue(result);

      const response = await controller.findAll(templateId);
      expect(mockTemplateTaskService.findAll).toHaveBeenCalledWith(templateId);
      expect(response).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id and return the result', async () => {
      const id = '1';
      const result = { id, name: 'Task 1', templateId: 'template-1' };
      mockTemplateTaskService.findOne.mockResolvedValue(result);

      const response = await controller.findOne(id);
      expect(mockTemplateTaskService.findOne).toHaveBeenCalledWith(id);
      expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call service.update with id and dto and return the result', async () => {
      const id = '1';
      const dto = { name: 'Updated Task', templateId: 'template-1' };
      const result = { id, ...dto };
      mockTemplateTaskService.update.mockResolvedValue(result);

      const response = await controller.update(id, dto as any);
      expect(mockTemplateTaskService.update).toHaveBeenCalledWith(id, dto);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call service.remove with id', async () => {
      const id = '1';
      mockTemplateTaskService.remove.mockResolvedValue(undefined);

      await controller.remove(id);
      expect(mockTemplateTaskService.remove).toHaveBeenCalledWith(id);
    });
  });
});
