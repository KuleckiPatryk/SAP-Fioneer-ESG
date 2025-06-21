import { Page } from '@playwright/test';

export class EsgKpiEnginePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get esgKpiEngineSection() {
        return this.page
            .locator('section')
            .filter({ has: this.page.getByRole('heading').filter({ hasText: /^ESG KPI Engine$/ }) });
    }
}
