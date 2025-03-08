import { Page } from '@playwright/test';
import logger from '../utils/logger';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart(productName: string) {
    try {
      await this.page.click(`text=${productName}`);
      await this.page.click('text=Add to cart');
      logger.info('Product added to cart.');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Add to cart failed: ${error.message}`);
      } else {
        logger.error(`Add to cart failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw error;
    }
  }

  async viewProductDetails(productName: string) {
    try {
      await this.page.click(`text=${productName}`);
      logger.info(`Viewed details for ${productName}.`);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`View product details failed: ${error.message}`);
      } else {
        logger.error(`View product details failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw error;
    }
  }

  async goToCart() {
    try {
      await this.page.click('a.shopping_cart_link');
      logger.info('Navigated to cart.');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Go to cart failed: ${error.message}`);
      } else {
        logger.error(`Go to cart failed with unknown error: ${JSON.stringify(error)}`);
      }
      throw error;
    }
  }
}
