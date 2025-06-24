import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistTemplateController } from './checklist-template.controller';
import { ChecklistTemplateService } from './checklist-template.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistTemplate, TokenEntity } from '../../database/entities';

describe('ChecklistTemplateController', () => {
  let controller: ChecklistTemplateController;

  const mockChecklistRepo = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  }
  const mockTokenRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  let checklistTemplateService: ChecklistTemplateService;

  const mockChecklistTemplateService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistTemplateController],
      providers: [
        {
          provide: ChecklistTemplateService,
          useValue: mockChecklistTemplateService,
        },
        {
          provide: getRepositoryToken(ChecklistTemplate),
          useValue: mockChecklistRepo,
        },{
          provide: getRepositoryToken(TokenEntity),
          useValue: mockTokenRepo,
        }
      ],
    }).compile();

    controller = module.get<ChecklistTemplateController>(ChecklistTemplateController);
    checklistTemplateService = module.get<ChecklistTemplateService>(ChecklistTemplateService);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call checklistTemplateService.create with the correct DTO', async () => {
      const dto = { name: 'Test Template' };
      mockChecklistTemplateService.create.mockResolvedValue(dto);

      const result = await controller.create(dto as any);

      expect(mockChecklistTemplateService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('findAll', () => {
    it('should call checklistTemplateService.findAll with the user id', async () => {
      const user = { id: 123 } as any;
      const templates = [{ id: 1 }, { id: 2 }];
      mockChecklistTemplateService.findAll.mockResolvedValue(templates);

      const result = await controller.findAll(user);

      expect(mockChecklistTemplateService.findAll).toHaveBeenCalledWith(user.id);
      expect(result).toEqual(templates);
    });
  });

  describe('findOne', () => {
    it('should call checklistTemplateService.findOne with the correct id', async () => {
      const id = 'abc123';
      const template = { id };
      mockChecklistTemplateService.findOne.mockResolvedValue(template);

      const result = await controller.findOne(id);

      expect(mockChecklistTemplateService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(template);
    });
  });

  describe('update', () => {
    it('should call checklistTemplateService.update with the correct id and DTO', async () => {
      const id = 'abc123';
      const dto = { name: 'Updated Template' };
      const updated = { id, ...dto };
      mockChecklistTemplateService.update.mockResolvedValue(updated);

      const result = await controller.update(id, dto as any);

      expect(mockChecklistTemplateService.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should call checklistTemplateService.remove with the correct id', async () => {
      const id = 'abc123';
      const removed = { id };
      mockChecklistTemplateService.remove.mockResolvedValue(removed);

      const result = await controller.remove(id);

      expect(mockChecklistTemplateService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(removed);
    });
  });


});
