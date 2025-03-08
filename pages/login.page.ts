import { Page } from '@playwright/test';
import logger from '../utils/logger';
import { ElementNotFoundError } from '../utils/errors';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';

  async login(username: string, password: string) {
    try {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
      logger.info('Login successful.');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Login failed: ${error.message}`);
      } else {
        logger.error(`Login failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw new ElementNotFoundError('Login elements not found or login failed.');
    }
  }
}
