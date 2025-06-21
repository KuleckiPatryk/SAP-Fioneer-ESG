import { Locator, Page } from '@playwright/test';

export class MainPage {
    private page: Page;
    private keyFactsSection: Locator;
    private keyFactHeader: Locator;
    private keyFactDescription: Locator;
    private financeAndEsgNavMenuItem: Locator;
    private esgKpiEngineMenuLink: Locator;
    private getInTouchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.keyFactsSection = this.page.locator('section').filter({ hasText: 'Key Facts' });
        this.keyFactHeader = this.keyFactsSection.locator('h3');
        this.keyFactDescription = this.keyFactsSection.locator('h4');
        this.financeAndEsgNavMenuItem = this.page.getByRole('listitem').filter({ hasText: 'Finance & ESG' });
        this.esgKpiEngineMenuLink = this.page.getByRole('link', { name: 'ESG KPI Engine' });
        this.getInTouchButton = this.page.locator('#header').getByRole('link', { name: 'Get in touch' });
    }

    async navigateTo() {
        await this.page.goto('');
    }

    async scrollToKeyFactsSection() {
        await this.keyFactsSection.scrollIntoViewIfNeeded();
    }

    async getKeyFacts() {
        var keyFactsHeaders = await this.keyFactHeader.allTextContents();
        var keyFactDescriptions = await this.keyFactDescription.allTextContents();

        const keyFacts = keyFactsHeaders.map((header, index) => `${header} ${keyFactDescriptions[index]}`);

        return keyFacts;
    }

    async navigateToEsgKpiEngine() {
        await this.financeAndEsgNavMenuItem.click();
        await this.esgKpiEngineMenuLink.click();
    }

    async clickGetInTouchButton() {
        await this.getInTouchButton.click();
    }
}
