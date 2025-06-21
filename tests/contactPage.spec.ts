import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';
import { MainPage } from '../pages/main.page';

test.describe('Open SAP Fioneer contact page', () => {
    let mainPage: MainPage;
    let contactPage: ContactPage;

    test.beforeEach('', async ({ page }) => {
        mainPage = new MainPage(page);
        contactPage = new ContactPage(page);
        await mainPage.navigateTo();
    });

    test('and verify email field validation message', async ({ page }) => {
        // Arrange
        const expectedMessage = 'Email must be formatted correctly.';
        const expectedTitle = 'SAP Fioneer | Contact | Get in touch!';
        const expectedUrl = 'https://www.sapfioneer.com/contact/';

        // Act
        await mainPage.clickGetInTouchButton();

        // Assert
        await expect(page).toHaveTitle(expectedTitle);
        await expect(page).toHaveURL(expectedUrl);

        // Act
        await contactPage.setWorkEmail('test');
        await contactPage.blurWorkEmail();

        // Assert
        await expect(contactPage.workEmailInputValidationMessage).toHaveText(expectedMessage);
    });
});
