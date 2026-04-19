import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ContactPage — Page Object for the Jupiter Toys Contact form.
 *
 * OOP:
 *  - Inherits navigation from BasePage
 *  - All locators are private (encapsulation)
 *  - Public methods are high-level actions and assertions only
 */
export class ContactPage extends BasePage {
  private readonly forenameInput:  Locator;
  private readonly surnameInput:   Locator;
  private readonly emailInput:     Locator;
  private readonly telephoneInput: Locator;
  private readonly messageInput:   Locator;
  private readonly submitButton:   Locator;
  private readonly forenameError:  Locator;
  private readonly emailError:     Locator;
  private readonly messageError:   Locator;

  constructor(page: Page) {
    super(page);
    this.forenameInput  = page.locator('#forename');
    this.surnameInput   = page.locator('#surname');
    this.emailInput     = page.locator('#email');
    this.telephoneInput = page.locator('#telephone');
    this.messageInput   = page.locator('#message');
    this.submitButton   = page.locator('a', { hasText: 'Submit' });
    this.forenameError  = page.locator('#forename-err');
    this.emailError     = page.locator('#email-err');
    this.messageError   = page.locator('#message-err');
  }

  getPageUrl(): string {
    return 'http://jupiter.cloud.planittesting.com/#/contact';
  }

  // ── Actions ──────────────────────────────────────────────────────────────
  async fillForename(value: string):  Promise<void> { await this.forenameInput.fill(value);  }
  async fillSurname(value: string):   Promise<void> { await this.surnameInput.fill(value);   }
  async fillEmail(value: string):     Promise<void> { await this.emailInput.fill(value);     }
  async fillTelephone(value: string): Promise<void> { await this.telephoneInput.fill(value); }
  async fillMessage(value: string):   Promise<void> { await this.messageInput.fill(value);   }
  async clickSubmit():                Promise<void> { await this.submitButton.click();        }

  async fillMandatoryFields(data: {
    forename: string; surname?: string;
    email: string;   telephone?: string; message: string;
  }): Promise<void> {
    await this.fillForename(data.forename);
    if (data.surname)   await this.fillSurname(data.surname);
    await this.fillEmail(data.email);
    if (data.telephone) await this.fillTelephone(data.telephone);
    await this.fillMessage(data.message);
  }

  // ── Assertions ────────────────────────────────────────────────────────────
  async verifyErrorsVisible(): Promise<void> {
    await expect(this.forenameError).toBeVisible();
    await expect(this.emailError).toBeVisible();
    await expect(this.messageError).toBeVisible();
    await expect(this.forenameError).toHaveText('Forename is required');
    await expect(this.emailError).toHaveText('Email is required');
    await expect(this.messageError).toHaveText('Message is required');
  }

  async verifyErrorsGone(): Promise<void> {
    await expect(this.forenameError).toBeHidden();
    await expect(this.emailError).toBeHidden();
    await expect(this.messageError).toBeHidden();
  }

  async verifySuccessMessage(forename: string): Promise<void> {
    await expect(
      this.page.getByText(`Thanks ${forename}, we appreciate your feedback.`)
    ).toBeVisible({ timeout: 30_000 });
  }
}
