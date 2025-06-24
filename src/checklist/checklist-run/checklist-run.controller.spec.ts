import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistRunController } from './checklist-run.controller';
import { ChecklistRunService } from './checklist-run.service';
import CreateChecklistRunDto from '../dto/create-checklist-run.dto';
import UpdateChecklistRunDto from '../dto/update-checklist-run.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenEntity } from '../../database/entities';

describe('ChecklistRunController', () => {
  let controller: ChecklistRunController;
  let service: ChecklistRunService;

  const mockChecklistRunService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockTokenRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistRunController],
      providers: [
        {
          provide: ChecklistRunService,
          useValue: mockChecklistRunService,
        },{
          provide: getRepositoryToken(TokenEntity),
          useValue: mockTokenRepo,
        }
      ],
    }).compile();

    controller = module.get<ChecklistRunController>(ChecklistRunController);
    service = module.get<ChecklistRunService>(ChecklistRunService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createChecklistRun', () => {
    it('should call service.create with dto and return result', async () => {
      const dto: CreateChecklistRunDto = { name: 'Test Checklist' } as any;
      const result = { id: '1', ...dto };
      mockChecklistRunService.create.mockResolvedValue(result);

      expect(await controller.createChecklistRun(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllChecklistRuns', () => {
    it('should call service.findAll with user id and return result', async () => {
      const user = { id: 'user1' } as any;
      const result = [{ id: '1' }];
      mockChecklistRunService.findAll.mockResolvedValue(result);

      expect(await controller.getAllChecklistRuns(user)).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(user.id);
    });
  });

  describe('getChecklistRunById', () => {
    it('should call service.findOne with id and return result', async () => {
      const id = '123';
      const result = { id };
      mockChecklistRunService.findOne.mockResolvedValue(result);

      expect(await controller.getChecklistRunById(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updateChecklistRun', () => {
    it('should call service.update with id and dto and return result', async () => {
      const id = '123';
      const dto: UpdateChecklistRunDto = { name: 'Updated' } as any;
      const result = { id, ...dto };
      mockChecklistRunService.update.mockResolvedValue(result);

      expect(await controller.updateChecklistRun(id, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('deleteChecklistRun', () => {
    it('should call service.remove with id and return result', async () => {
      const id = '123';
      const result = { deleted: true };
      mockChecklistRunService.remove.mockResolvedValue(result);

      expect(await controller.deleteChecklistRun(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
