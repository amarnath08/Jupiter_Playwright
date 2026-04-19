import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** HomePage — entry point; inherits all nav methods from BasePage. */
export class HomePage extends BasePage {
  constructor(page: Page) { super(page); }

  getPageUrl(): string {
    return 'http://jupiter.cloud.planittesting.com';
  }
}
