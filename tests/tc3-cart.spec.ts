import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ShopPage } from '../pages/ShopPage';
import { CartPage } from '../pages/CartPage';

/**
 * TC3 — Shopping Cart Verification
 * 1. Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
 * 2. Go to the cart page
 * 3. Verify the subtotal for each product is correct
 * 4. Verify the price for each product
 * 5. Verify that total = sum of subtotals
 *
 * Prices confirmed from live Jupiter Toys site:
 *   Stuffed Frog   $10.99
 *   Fluffy Bunny   $9.99
 *   Valentine Bear $14.99
 */
test.describe('TC3 — Shopping Cart Verification', () => {

  test('subtotals, prices and grand total should all be correct', async ({ page }) => {

    // Step 1: Buy items — add one of each to the cart then update quantities
    const homePage = new HomePage(page);
    await homePage.goto();

    const shopPage = new ShopPage(page);
    await homePage.clickNavShop();

    await shopPage.buyProduct('Stuffed Frog');
    await shopPage.buyProduct('Fluffy Bunny');
    await shopPage.buyProduct('Valentine Bear');

    // Step 2: Go to the cart page
    const cartPage = new CartPage(page);
    await shopPage.clickNavCart();

    // Set required quantities — triggers AngularJS to recalculate subtotals
    await cartPage.setQuantity(1, 2); // Stuffed Frog   × 2
    await cartPage.setQuantity(2, 5); // Fluffy Bunny   × 5
    await cartPage.setQuantity(3, 3); // Valentine Bear × 3

    // Steps 3, 4 & 5: Verify prices, subtotals and grand total
    await cartPage.verifyCartTotals([
      { row: 1, expectedPrice: 10.99, quantity: 2 }, // Stuffed Frog
      { row: 2, expectedPrice:  9.99, quantity: 5 }, // Fluffy Bunny
      { row: 3, expectedPrice: 14.99, quantity: 3 }, // Valentine Bear
    ]);
  });

});
