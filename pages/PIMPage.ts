import { Page } from '@playwright/test';
import type { EmployeeData } from '../types/EmployeeData';
export class PIMPage {

    constructor(private page: Page) {

    }
    get personalDetailsHeading() {
        return this.page.getByRole('heading', { name: 'Personal Details' });
    }

    get lastNameInput() {
        return this.page.getByPlaceholder('Last Name');
    }
    get licenseExpiryDateInput() {
        return this.page.locator('//label[normalize-space()="License Expiry Date"]/../../descendant::input')
    }
    get licenseNumberInput() {
        return this.page.locator(
            `//label[normalize-space()="Driver's License Number"]/../../descendant::input`
        );
    }

    get updateSuccessMessage() {
        return this.page.getByText('Successfully Updated');
    }
    async navigateToPIM() {
        await this.page.getByRole('link', { name: 'PIM' }).click();
    }
    async searchEmployeeByName(employeename: string) {
        await this.page.locator('//label[normalize-space()="Employee Name"]/ancestor::div[contains(@class,"oxd-grid-item")][1]//input'
        ).fill(employeename);
    }

    async selectNameFromDropdown(employeename: string) {

        await this.page.getByRole('listbox')
            .getByRole('option', { name: employeename })
            .click();
    }
    async clickSearch() {
        await this.page.getByRole('button', { name: "Search" }).click();
    }
    getEmployeeRow(firstName: string, lastName: string) {
        return this.page.locator('.oxd-table-body .oxd-table-row')
            .filter({ hasText: firstName })
            .filter({ hasText: lastName });
    }
    async navigateToAddEmployee() {

        await this.page.getByRole("button", { name: "Add" }).click();
    }
    async enterEmployeeDetails(firstName: string, lastName: string) {
        await this.page.getByPlaceholder("First Name").fill(firstName);
        await this.page.getByPlaceholder("Last Name").fill(lastName);
        6
    }
    async clickSave() {
        await this.page.getByRole("button", { name: "Save" }).click();
    }
    async updateEmployeeLastName(lastname: string) {

        await this.page.getByPlaceholder("Last Name").fill(lastname);

    }

    async updateEmployeePersonalDetails(employeeData: EmployeeData) {
        // Update employee's last name
        await this.lastNameInput.fill(employeeData.lastName);
        await this.lastNameInput.press('Tab');
        // Update employee's license number
        await this.licenseNumberInput.fill(employeeData.licenseNumber);
         // Update employee's license expiry date
         await this.licenseExpiryDateInput.fill(employeeData.licenseExpiryDate)

    }

    async saveUpdatedPersonalDetails() {
        await this.page.getByRole('button', { name: 'Save' }).first().click();

    }
}