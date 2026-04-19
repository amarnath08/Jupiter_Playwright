import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage'
;
/**
 * TC1 — Contact Form Validation
 * 1. From the home page go to the contact page
 * 2. Click submit button
 * 3. Verify error messages
 * 4. Populate mandatory fields
 * 5. Validate errors are gone
 */
test.describe('TC1 — Contact Form Validation', () => {

  test('should show errors on empty submit then clear when mandatory fields are filled', async ({ page }) => {

    // Step 1: From the home page go to the contact page
    const homePage = new HomePage(page);
    await homePage.goto();

    const contactPage = new ContactPage(page);
    await homePage.clickNavContact();

    // Step 2: Click submit button (empty form)
    await contactPage.clickSubmit();

    // Step 3: Verify error messages
    await contactPage.verifyErrorsVisible();

    // Step 4: Populate mandatory fields
    await contactPage.fillForename('John');
    await contactPage.fillEmail('john.doe@example.com');
    await contactPage.fillMessage('This is a test message.');

    // Step 5: Validate errors are gone
    await contactPage.verifyErrorsGone();
  });

});
