import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { loadTestData } from '../utils/testDataLoader';
import config from '../config/config';

test.describe('Regression Tests', () => {
  const testData = loadTestData();

  // Test Case 1: Verify that the login page loads successfully
  test('Login Page Load Test @regression', async ({ page }) => {
    await page.goto(config.baseUrl);
    await expect(page).toHaveTitle('Swag Labs');
  });

  // Test Case 2: Verify that a user can log in successfully
  test('User Login Test @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await expect(page).toHaveURL(`${config.baseUrl}/inventory.html`);
  });

  // Test Case 3: Verify that the inventory page loads successfully after login
  test('Inventory Page Load Test @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await expect(page).toHaveURL(`${config.baseUrl}/inventory.html`);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // Test Case 4: Verify that a product can be added to the cart
  test('Add Product to Cart Test @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await productPage.addToCart('Sauce Labs Backpack');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  // Test Case 5: Verify that the cart page loads successfully
  test('View Cart Page Test @regression', async ({ page }) => {
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

  // Test Case 6: Verify that the checkout process works correctly
  test('Checkout Process Test @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await productPage.addToCart('Sauce Labs Backpack');
    await cartPage.viewCart();
    await cartPage.checkout();
    await checkoutPage.enterCheckoutInformation('First', 'Last', '12345');
    await checkoutPage.finishCheckout();
    // Using regular expression to ignore case sensitivity
    await expect(page.locator('.complete-header')).toHaveText(/thank you for your order!/i);
  });

  // Test Case 7: Verify that product details are correct
  test('Product Details Test @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await productPage.viewProductDetails('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
  });

  // Test Case 8: Verify that the user can logout successfully
  test('User Logout Test @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
    const loginCredentials = testData.loginData[0];
    await loginPage.login(loginCredentials.username, loginCredentials.password);
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await expect(page).toHaveURL(`${config.baseUrl}/`);
  });

});
