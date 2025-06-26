/**
 * Unit tests for the AppController.
 * Ensures the root endpoint returns the expected string.
 */
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Test suite for AppController
describe('AppController', () => {
  let appController: AppController;

  // Set up a testing module with the AppController and AppService before each test
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // Test the root endpoint
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
