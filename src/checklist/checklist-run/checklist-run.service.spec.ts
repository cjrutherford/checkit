import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistRunService } from './checklist-run.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistRun } from '../../database/entities';
import { Repository } from 'typeorm';

describe('ChecklistRunService', () => {
  let service: ChecklistRunService;

  const mockChecklistRepo = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecklistRunService, {provide: getRepositoryToken(ChecklistRun), useValue: mockChecklistRepo}],
    }).compile();

    service = module.get<ChecklistRunService>(ChecklistRunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockChecklistRun = {
    id: '1',
    userId: 'user1',
    createdAt: new Date(),
    tasks: [],
  };

  const mockChecklistRunArray = [
    { ...mockChecklistRun, id: '1' },
    { ...mockChecklistRun, id: '2' },
  ];

  describe('ChecklistRunService', () => {
    let service: ChecklistRunService;
    let repo: Repository<ChecklistRun>;

    const repoMock = {
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ChecklistRunService,
          {
            provide: getRepositoryToken(ChecklistRun),
            useValue: repoMock,
          },
        ],
      }).compile();

      service = module.get<ChecklistRunService>(ChecklistRunService);
      repo = module.get<Repository<ChecklistRun>>(getRepositoryToken(ChecklistRun));
      jest.clearAllMocks();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('create', () => {
      it('should create and return a checklist run', async () => {
        const dto = { userId: 'user1' };
        repoMock.create.mockReturnValue(dto);
        repoMock.save.mockResolvedValue([mockChecklistRun]);
        const result = await service.create(dto);
        expect(repoMock.create).toHaveBeenCalledWith(dto);
        expect(repoMock.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(mockChecklistRun);
      });
    });

    describe('findAll', () => {
      it('should return all checklist runs for a user', async () => {
        repoMock.find.mockResolvedValue(mockChecklistRunArray);
        const result = await service.findAll('user1');
        expect(repoMock.find).toHaveBeenCalledWith({
          where: { userId: 'user1' },
          order: { createdAt: 'DESC' },
        });
        expect(result).toEqual(mockChecklistRunArray);
      });
    });

    describe('findOne', () => {
      it('should return a checklist run by id', async () => {
        repoMock.findOne.mockResolvedValue(mockChecklistRun);
        const result = await service.findOne('1');
        expect(repoMock.findOne).toHaveBeenCalledWith({
          where: { id: '1' },
          relations: ['tasks'],
        });
        expect(result).toEqual(mockChecklistRun);
      });

      it('should throw if checklist run not found', async () => {
        repoMock.findOne.mockResolvedValue(undefined);
        await expect(service.findOne('notfound')).rejects.toThrow(
          'Checklist run with id notfound not found'
        );
      });
    });

    describe('update', () => {
      it('should update and return the checklist run', async () => {
        const updateDto = { name: 'updated' };
        const updatedRun = { ...mockChecklistRun, ...updateDto };
        jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockChecklistRun as any);
        repoMock.save.mockResolvedValue(updatedRun);
        const result = await service.update('1', updateDto);
        expect(service.findOne).toHaveBeenCalledWith('1');
        expect(repoMock.save).toHaveBeenCalledWith({ ...mockChecklistRun, ...updateDto });
        expect(result).toEqual(updatedRun);
      });
    });

    describe('remove', () => {
      it('should remove the checklist run', async () => {
        jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockChecklistRun as any);
        repoMock.remove.mockResolvedValue(undefined);
        await service.remove('1');
        expect(service.findOne).toHaveBeenCalledWith('1');
        expect(repoMock.remove).toHaveBeenCalledWith(mockChecklistRun);
      });
    });
  });
});
