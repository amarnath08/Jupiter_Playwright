import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage — Page Object for the Jupiter Toys Cart page.
 *
 * OOP:
 *  - Inherits navigation from BasePage
 *  - Raw XPath/parsing logic is private (encapsulation)
 *  - verifyCartTotals() is a single high-level assertion method
 */
export class CartPage extends BasePage {
  constructor(page: Page) { super(page); }

  getPageUrl(): string {
    return 'http://jupiter.cloud.planittesting.com/#/cart';
  }

  // ── Private helpers ───────────────────────────────────────────────────────
  private parseCurrency(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  // ── Public actions ────────────────────────────────────────────────────────
  async getItemPrice(row: number): Promise<number> {
    const text = await this.page.locator(`//tr[${row}]//td[2]`).innerText();
    return this.parseCurrency(text);
  }

  async getSubTotal(row: number): Promise<number> {
    const text = await this.page.locator(`//tr[${row}]//td[4]`).innerText();
    return this.parseCurrency(text);
  }

  async getCartTotal(): Promise<number> {
    const text = await this.page.locator('//tfoot//td/strong').innerText();
    return this.parseCurrency(text);
  }

  async setQuantity(row: number, quantity: number): Promise<void> {
    const input = this.page.locator(`//tr[${row}]//input`);
    await input.fill(quantity.toString());
    await input.press('Tab'); // triggers AngularJS digest → recalculates subtotal
  }

  // ── Assertions ────────────────────────────────────────────────────────────
  async verifyCartTotals(
    items: Array<{ row: number; expectedPrice: number; quantity: number }>
  ): Promise<void> {
    let sumOfSubtotals = 0;

    for (const item of items) {
      const price    = await this.getItemPrice(item.row);
      const subtotal = await this.getSubTotal(item.row);
      const expected = parseFloat((item.expectedPrice * item.quantity).toFixed(2));

      expect(price,    `Row ${item.row} — unit price`   ).toBeCloseTo(item.expectedPrice, 2);
      expect(subtotal, `Row ${item.row} — subtotal`     ).toBeCloseTo(expected, 2);

      sumOfSubtotals += subtotal;
    }

    const grandTotal = await this.getCartTotal();
    expect(grandTotal, 'Grand total = sum of all subtotals').toBeCloseTo(sumOfSubtotals, 2);
  }
}
