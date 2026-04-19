import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ShopPage — Page Object for the Jupiter Toys Shop page.
 *
 * OOP:
 *  - Inherits navigation from BasePage
 *  - Buy-button resolution is private (encapsulation)
 *  - addToCart() is the clean public API callers use
 */
export class ShopPage extends BasePage {
  constructor(page: Page) { super(page); }

  getPageUrl(): string {
    return 'http://jupiter.cloud.planittesting.com/#/shop';
  }

  private getBuyButton(productName: string): Locator {
    return this.page.locator(`//h4[text()="${productName}"]/..//a`);
  }

  async buyProduct(productName: string): Promise<void> {
    await this.getBuyButton(productName).click();
  }

  async addToCart(productName: string, quantity: number): Promise<void> {
    for (let i = 0; i < quantity; i++) {
      await this.buyProduct(productName);
    }
  }
}
