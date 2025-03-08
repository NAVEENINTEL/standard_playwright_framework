import { Page } from '@playwright/test';
import logger from '../utils/logger';
import { ElementNotFoundError } from '../utils/errors';

export class CheckoutPage {
  constructor(private page: Page) {}

  // Selector for the checkout information fields
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = 'input[type="submit"]';

  // Corrected selector for the finish button using the `id` attribute
  private finishButton = '#finish';

  async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    try {
      await this.page.fill(this.firstNameInput, firstName);
      await this.page.fill(this.lastNameInput, lastName);
      await this.page.fill(this.postalCodeInput, postalCode);
      await this.page.click(this.continueButton);
      logger.info('Checkout information entered.');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Entering checkout information failed: ${error.message}`);
      } else {
        logger.error(`Entering checkout information failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw new ElementNotFoundError('Checkout information fields not found.');
    }
  }

  async finishCheckout() {
    try {
      await this.page.click(this.finishButton);
      logger.info('Checkout finished.');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Checkout failed: ${error.message}`);
      } else {
        logger.error(`Checkout failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw new ElementNotFoundError('Finish button not found.');
    }
  }
}
