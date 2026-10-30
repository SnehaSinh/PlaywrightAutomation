import { Page, expect } from '@playwright/test';
import type { EmployeeData } from '../types/EmployeeData';
import type { EmployeeAdditionalData } from '../types/EmployeeData';
import { generateRandomNationality } from '../helpers/employeeDataHelper';

export class PIMPage {

    constructor(private page: Page) {

    }
    get personalDetailsHeading() {
        return this.page.getByRole('heading', { name: 'Personal Details' });
    }

    get pimHeading() {
        return this.page.getByRole('link', { name: "PIM" });
    }
    get dashboardHeading() {
        return this.page.getByRole('heading', { name: "Dashboard" });
    }
    get employeeInformationHeading() {
        return this.page.getByRole('heading', { name: "Employee Information" });
    }
    get addEmployeePageTitle() {
        return this.page.getByRole("heading", { name: "Add Employee", exact: true });
    }
    get emptyFirstName() {
        return this.page.locator('//input[contains(@class,"oxd-input--error orangehrm-firstname")]')
    }
     get emptyLastName() {
        return this.page.locator('//input[contains(@class,"oxd-input--error orangehrm-lastname")]')
    }
       get firstNameInput() {
        return this.page.getByPlaceholder('First Name');
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
    get marriageStatusInput() {
        return this.page.locator('//label[normalize-space()="Marital Status"]/../../descendant::div[contains(@class,"oxd-select-text-input")]')

    }
    get dateOfBirthInput() {
        return this.page.locator('//label[normalize-space()="Date of Birth"]/../../descendant::input')
    }
    get nationalityInput() {
        return this.page.locator('//label[normalize-space()="Nationality"]/../../descendant::div[@class="oxd-select-text-input"]')


    }

    get updateSuccessMessage() {
        return this.page.getByText('Successfully Updated');
    }

    getGenderRadio(gender: string) {
        return this.page.locator(
            `//label[normalize-space()='${gender}']`
        );
    }
    get noRecordsFoundMessage() {
        return this.page.locator('//div[@class="orangehrm-horizontal-padding orangehrm-vertical-padding"]/span[normalize-space()="No Records Found"]');
    }
    get successfullyDeletedMessage() {
        return this.page.getByText('Successfully Deleted', { exact: true });
    }
    get successfullyUpdatedMessage() {
        return this.page.getByText('Successfully Updated', { exact: true });
    }
    get successfullySaved() {
        return this.page.getByText('Successfully Saved', { exact: true });
    }
    get firstNameRequiredMessage() {
        return this.page.locator(
            '//input[contains(@class,"orangehrm-firstname")]/../../span[normalize-space()="Required"]'
        );
    }
     get lastNameRequiredMessage() {
        return this.page.locator(
            '//input[contains(@class,"orangehrm-lastname")]/../../span[normalize-space()="Required"]'
        );
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

    }
    async clickSave() {
        await this.page.getByRole("button", { name: "Save" }).click();
    }

    async updateEmployeePersonalDetails(employeeData: EmployeeData) {
        // Update employee's last name
        await this.lastNameInput.fill(employeeData.lastName);
        await this.lastNameInput.press('Tab');
        // Update employee's license number
        await this.licenseNumberInput.fill(employeeData.licenseNumber);
        // Update employee's license expiry date
        await this.licenseExpiryDateInput.fill(employeeData.licenseExpiryDate)
        //Update employee's Marital Status
        await this.marriageStatusInput.click();
        await this.page.getByRole('option', {
            name: employeeData.maritalStatus,
            exact: true
        }).click();

    }
    async updateEmployeeAdditionalDetails(employeeData: EmployeeAdditionalData) {
        // Update employee's gender
        await this.getGenderRadio(employeeData.gender).click();

        //Update Employee's Date of Birth
        await this.dateOfBirthInput.fill(employeeData.dateOfBirth);

    }
    async saveUpdatedPersonalDetails() {
        await this.page.getByRole('button', { name: 'Save' }).first().click();

    }
    async selectRandomNationality(): Promise<string> {

        await this.nationalityInput.click();

        const nationality = await generateRandomNationality(this.page);

        await this.page.getByRole('listbox')
            .getByRole('option', { name: nationality, exact: true })
            .click();

        return nationality;
    }
    async verifyPersonalDetailsPageLoaded(lastName: string) {
        await expect(this.personalDetailsHeading).toBeVisible({ timeout: 15000 });
        await expect(this.lastNameInput).toHaveValue(lastName);
    }

    async clickDeleteEmployee(firstName: string, lastName: string) {
        const employeeRow = this.getEmployeeRow(firstName, lastName);

        const deleteButton = employeeRow.locator('button')
            .filter({ has: this.page.locator('i.bi-trash') });

        await deleteButton.click();
    }
    async confirmDeleteEmployee() {
        await this.page.getByRole('button', {
            name: 'Yes, Delete'
        }).click();
    }
}
