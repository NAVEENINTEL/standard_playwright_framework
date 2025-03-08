import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { loadTestData } from '../utils/testDataLoader';
import config from '../config/config';

test.describe('End-to-End Tests', () => {
  const testData = loadTestData();

  test('Complete Checkout Process @e2e', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Navigate to the base URL
    await page.goto(config.baseUrl);

    // Log in to the application
    await loginPage.login(testData.login.username, testData.login.password);

    // Add a product to the cart
    await productPage.addToCart(testData.products[0]);

    // View the cart
    await cartPage.viewCart();
    await expect(page).toHaveURL(`${config.baseUrl}/cart.html`);

    // Proceed to checkout
    await cartPage.checkout();

    // Enter checkout information
    await checkoutPage.enterCheckoutInformation(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.postalCode
    );

    // Finish checkout
    await checkoutPage.finishCheckout();

    // Verify order completion
    await expect(page.locator('.complete-header')).toHaveText(/thank you for your order!/i);
  });
});
