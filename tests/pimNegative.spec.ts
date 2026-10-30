import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);

    await loginpage.navigateToLoginPage();
    await loginpage.loginToApplication("Admin", "admin123");
});

const testData = [
    {
        scenario: 'firstNameMissing',
        firstName: '',
        lastName: 'Automation'
    },
    {
        scenario: 'lastNameMissing',
        firstName: 'Test',
        lastName: ''
    },
    {
        scenario: 'bothMissing',
        firstName: '',
        lastName: ''
    }
];

for (const data of testData) {

    test(`Validation: ${data.scenario}`, async ({ pimpage }) => {
        // Given user navigates to Add Employee
        await pimpage.navigateToPIM();
        await pimpage.navigateToAddEmployee();

        // When user enters the test data
        await pimpage.firstNameInput.fill(data.firstName);
        await pimpage.lastNameInput.fill(data.lastName);

        // And clicks Save
        await pimpage.clickSave();

        switch (data.scenario) {
            case 'firstNameMissing':
                await expect(pimpage.firstNameRequiredMessage).toBeVisible();
                await expect(pimpage.lastNameRequiredMessage).toBeHidden();
                break;
                

            case 'lastNameMissing':
                await expect(pimpage.firstNameRequiredMessage).toBeHidden();
                await expect(pimpage.lastNameRequiredMessage).toBeVisible();
                break;

            case 'bothMissing':
                await expect(pimpage.firstNameRequiredMessage).toBeVisible();
                await expect(pimpage.lastNameRequiredMessage).toBeVisible();
                break;
            default:
                throw new Error(`Unknown scenario: ${data.scenario}`);
        }
        // Common assertion for every scenario
        await expect(pimpage.addEmployeePageTitle).toBeVisible();
    });
}
