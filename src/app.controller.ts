/**
 * Main application controller for the Checkit backend API.
 * Handles root-level routes and delegates to the AppService.
 */
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * Controller for the root endpoint.
 */
@Controller()
export class AppController {
  /**
   * Injects the main application service.
   * @param appService The application service instance
   */
  constructor(private readonly appService: AppService) {}

  /**
   * GET / endpoint.
   * @returns A hello world string from the service
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
