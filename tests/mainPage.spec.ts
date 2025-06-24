import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { EsgKpiEnginePage } from '../pages/esgKpiEngine.page';

test.describe('Open SAP Fioneer main page', () => {
    let mainPage: MainPage;
    let esgKpiEnginePage: EsgKpiEnginePage;

    test.beforeEach('', async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.navigateTo();
    });

    test('and verify key facts section', async () => {
        // Arrange
        const expectedKeyFacts = [
            '1,200+ financial institutions run SAP Fioneer software globally',
            '>5,500 transactions per second processed through our systems',
            '5 out of 10 of the world’s most profitable banks use our technology',
            '50% of the world’s largest insurers use SAP Fioneer software',
        ];

        // Act
        await mainPage.scrollToKeyFactsSection();
        const currentKeyFacts = await mainPage.getKeyFacts();

        // Assert
        expect(currentKeyFacts).toEqual(expectedKeyFacts);
    });

    test('and verify navigation from menu to ESG KPI Engine', async ({ page }) => {
        // Arrange
        esgKpiEnginePage = new EsgKpiEnginePage(page);
        const expectedPageTitle = 'Stay audit-ready with the ESG KPI Engine | SAP Fioneer';
        const expectedUrl = 'https://www.sapfioneer.com/finance-esg/esg-kpi-engine/';

        // Act
        await mainPage.navigateToEsgKpiEngine();

        // Assert
        await expect(page).toHaveTitle(expectedPageTitle);
        await expect(page).toHaveURL(expectedUrl);
        await expect(esgKpiEnginePage.esgKpiEngineSection).toBeVisible();
    });
});
