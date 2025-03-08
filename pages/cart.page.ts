import { Page } from '@playwright/test';
import logger from '../utils/logger';
import { ElementNotFoundError } from '../utils/errors';

export class CartPage {
  constructor(private page: Page) {}

  // Selector for the shopping cart link
  private cartLink = 'a.shopping_cart_link';

  // Corrected selector for the checkout button using the `id` attribute
  private checkoutButton = '#checkout';

  // Method to view the cart
  async viewCart() {
    try {
      await this.page.click(this.cartLink);
      logger.info('Navigated to cart.');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`View cart failed: ${error.message}`);
      } else {
        logger.error(`View cart failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw new ElementNotFoundError('Cart link not found.');
    }
  }

  // Method to remove a product from the cart
  async removeProduct(productName: string) {
    try {
      const productSelector = `text=${productName}`;
      const removeButtonSelector = `xpath=//div[text()='${productName}']//following-sibling::div/button[contains(text(),'Remove')]`;
      await this.page.waitForSelector(productSelector);
      await this.page.click(removeButtonSelector);
      logger.info(`${productName} removed from cart.`);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Remove product failed: ${error.message}`);
      } else {
        logger.error(`Remove product failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw new ElementNotFoundError(`Remove button for ${productName} not found.`);
    }
  }

  // Method to initiate the checkout process
  async checkout() {
    try {
      await this.page.click(this.checkoutButton);
      logger.info('Checkout initiated.');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Checkout failed: ${error.message}`);
      } else {
        logger.error(`Checkout failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw new ElementNotFoundError('Checkout button not found.');
    }
  }
}
