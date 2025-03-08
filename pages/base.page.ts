import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';
import { CartPage } from './cart.page';
import { CheckoutPage } from './checkout.page';

export class BasePage {
  protected page: Page;
  public loginPage: LoginPage;
  public productPage: ProductPage;
  public cartPage: CartPage;
  public checkoutPage: CheckoutPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}
