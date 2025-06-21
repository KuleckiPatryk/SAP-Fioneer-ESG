import { Locator, Page } from '@playwright/test';

export class ContactPage {
    private page: Page;
    private contactFormFrame;
    private workEmailInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactFormFrame = this.page.frameLocator('#hs-form-iframe-0');
        this.workEmailInput = this.contactFormFrame.getByRole('textbox', { name: 'Work email*' });
    }

    async setWorkEmail(email: string) {
        await this.workEmailInput.scrollIntoViewIfNeeded();
        await this.workEmailInput.fill(email);
    }

    async blurWorkEmail() {
        await this.workEmailInput.blur();
    }

    get workEmailInputValidationMessage() {
        return this.contactFormFrame
            .locator('div')
            .filter({ has: this.workEmailInput })
            .locator('xpath=following-sibling::ul//label');
    }
}
