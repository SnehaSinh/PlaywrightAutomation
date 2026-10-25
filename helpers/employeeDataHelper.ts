import { PIMPage } from '../pages/PIMPage';
import type { EmployeeData } from '../types/EmployeeData';

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
        maritalStatus: '',
        nationality: '',
        dateOfBirth: '',
        gender: ''
    }


}
export function generateLicenseExpiryDate(): string {
    const date = new Date();

    date.setFullYear(date.getFullYear() + 2);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${day}-${month}`;
}


