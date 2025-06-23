import { Test, TestingModule } from '@nestjs/testing';
import { RunTaskController } from './run-task.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RunTask, TokenEntity } from '../../database/entities';
import { RunTaskService } from './run-task.service';

describe('RunTaskController', () => {
  let controller: RunTaskController;

  const mockTokenRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockRunTaskREpo = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockRunTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunTaskController],
      providers: [{
        provide: getRepositoryToken(TokenEntity),
        useValue: mockTokenRepo,
      },{
        provide: getRepositoryToken(RunTask),
        useValue: mockRunTaskREpo,
      },{
        provide: RunTaskService,
        useValue: mockRunTaskService,
      }]
    }).compile();

    controller = module.get<RunTaskController>(RunTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call runTaskService.findAll with the correct checklistRunId and return result', async () => {
      const checklistRunId = '123';
      const result = [{ id: '1' }] as any;
      mockRunTaskService.findAll.mockResolvedValue(result);

      const response = await controller.findAll(checklistRunId);

      expect(mockRunTaskService.findAll).toHaveBeenCalledWith(checklistRunId);
      expect(response).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should call runTaskService.findOne with the correct id and return result', async () => {
      const id = 'abc';
      const result = { id: 'abc' } as any;
      mockRunTaskService.findOne.mockResolvedValue(result);

      const response = await controller.findOne(id);

      expect(mockRunTaskService.findOne).toHaveBeenCalledWith(id);
      expect(response).toBe(result);
    });
  });

  describe('update', () => {
    it('should call runTaskService.update with the correct id and dto and return result', async () => {
      const id = 'xyz';
      const dto = { name: 'test' } as any;
      const result = { id: 'xyz', name: 'test' } as any;
      mockRunTaskService.update.mockResolvedValue(result);

      const response = await controller.update(id, dto);

      expect(mockRunTaskService.update).toHaveBeenCalledWith(id, dto);
      expect(response).toBe(result);
    });
  });

  describe('remove', () => {
    it('should call runTaskService.remove with the correct id', async () => {
      const id = 'del';
      mockRunTaskService.remove.mockResolvedValue(undefined);

      await controller.remove(id);

      expect(mockRunTaskService.remove).toHaveBeenCalledWith(id);
    });
  });
});
