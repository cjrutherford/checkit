/**
 * Main application service for the Checkit backend API.
 * Provides core business logic for the root controller.
 */
import { Injectable } from '@nestjs/common';

/**
 * Service for root-level application logic.
 */
@Injectable()
export class AppService {
  /**
   * Returns a hello world string.
   * @returns {string} Hello World!
   */
  getHello(): string {
    return 'Hello World!';
  }
}
