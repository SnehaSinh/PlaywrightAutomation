import type { EmployeeData } from '../types/EmployeeData';
import type { EmployeeAdditionalData } from '../types/EmployeeData';
import type { Page } from '@playwright/test';

export function generateEmployeeName() {
    const firstName = `Test${Date.now()}`;
    const lastName = 'Automation';

    return { firstName, lastName };
}

export function generateRandomLastName(): string {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return Array.from(
        { length: 4 },
        () => alphabets[Math.floor(Math.random() * alphabets.length)]
    ).join('');
}
export function generateLicensenumber(): string {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return `DL${randomNumber}`
};
export function generateUpdatedEmployeeData(): EmployeeData {
    return {
        lastName: generateRandomLastName(),
        licenseNumber: generateLicensenumber(),
        licenseExpiryDate: generateLicenseExpiryDate(),
        maritalStatus: generateMaritalStatus(),

    }


}

export function generateEmployeeAdditionalData(): EmployeeAdditionalData {
    return {
        nationality: '',
        gender: generateGender(),
        dateOfBirth: generateDateOfBirth()
    };
}
export function generateLicenseExpiryDate(): string {
    const date = new Date();

    date.setFullYear(date.getFullYear() + 2);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${day}-${month}`;
}
export function generateMaritalStatus(): string {
    const statuses = ["Single", "Married", "Other"]
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex]
}

export function generateGender(): string {
    const genders = ["Male", "Female"]
    const randomIndex = Math.floor(Math.random() * genders.length);
    return genders[randomIndex]
}

export function generateDateOfBirth(): string {
    const date = new Date();

    const minAge = 25;
    const maxAge = 50;

    const randomAge = Math.floor(
        Math.random() * (maxAge - minAge + 1)
    ) + minAge;

    date.setFullYear(date.getFullYear() - randomAge);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${day}-${month}`;
}

export async function generateRandomNationality(page: Page): Promise<string> {
    const options = page.getByRole('listbox').getByRole('option');
    await options.first().waitFor({
        state: 'visible',
        timeout: 15000
    });
    const count = await options.count();

    if (count <= 1) {
        throw new Error('No valid nationality options found');
    }

    const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;

    const nationality = (await options.nth(randomIndex).innerText()).trim();

    return nationality;
}
