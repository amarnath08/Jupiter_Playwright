import { Page, Locator } from '@playwright/test';

/**
 * BasePage — Abstract base class for all Page Objects.
 *
 * OOP Principles:
 *  - Abstraction:    abstract class; subclasses must implement getPageUrl()
 *  - Encapsulation:  page instance and nav locators are protected/private
 *  - Inheritance:    all pages extend this and get goto() + nav methods for free
 */
export abstract class BasePage {
  protected readonly page: Page;

  private readonly navHome:    Locator;
  private readonly navShop:    Locator;
  private readonly navContact: Locator;
  private readonly navCart:    Locator;

  constructor(page: Page) {
    this.page       = page;
    this.navHome    = page.locator('#nav-home');
    this.navShop    = page.locator('#nav-shop');
    this.navContact = page.locator('#nav-contact');
    this.navCart    = page.locator('#nav-cart');
  }

  /** Each page declares its own URL — enforced by abstract. */
  abstract getPageUrl(): string;

  async goto(): Promise<void> {
    await this.page.goto(this.getPageUrl());
  }

  async clickNavHome():    Promise<void> { await this.navHome.click();    }
  async clickNavShop():    Promise<void> { await this.navShop.click();    }
  async clickNavContact(): Promise<void> { await this.navContact.click(); }
  async clickNavCart():    Promise<void> { await this.navCart.click();    }
}
