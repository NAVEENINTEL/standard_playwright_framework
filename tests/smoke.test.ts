import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { loadTestData } from '../utils/testDataLoader';
import config from '../config/config';

test.describe('Smoke Tests', () => {
  const testData = loadTestData();

  // Test Case 1: Verify that the login page loads successfully
  test('Login Page Load Test @smoke', async ({ page }) => {
    await page.goto(config.baseUrl);
    await expect(page).toHaveTitle('Swag Labs');
  });

  // Test Case 2: Verify that a user can log in successfully
  test('User Login Test @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await expect(page).toHaveURL(`${config.baseUrl}/inventory.html`);
  });

  // Test Case 3: Verify that the inventory page loads successfully after login
  test('Inventory Page Load Test @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await expect(page).toHaveURL(`${config.baseUrl}/inventory.html`);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // Test Case 4: Verify that a product can be added to the cart
  test('Add Product to Cart Test @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await productPage.addToCart('Sauce Labs Backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  // Test Case 5: Verify that the cart page loads successfully
  test('View Cart Page Test @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await productPage.addToCart('Sauce Labs Backpack');
    await cartPage.viewCart();
    await expect(page).toHaveURL(`${config.baseUrl}/cart.html`);
  });

});
