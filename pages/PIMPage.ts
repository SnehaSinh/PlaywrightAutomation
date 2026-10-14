import { Page } from '@playwright/test';
export class PIMPage {

    constructor(private page: Page) {

    }
    async navigateToPIM(){
        await this.page.getByRole('link',{name:'PIM'}).click();
    }
    async searchEmployeeByName(employeename:string){
        await this.page.locator('//label[normalize-space()="Employee Name"]/ancestor::div[contains(@class,"oxd-grid-item")][1]//input'
).fill(employeename);
    }
    async selectNameFromDropdown(employeename:string){
        await this.page.getByRole('listbox')
    .getByRole('option', { name: employeename})
    .click();
    }
    async clickSearch(){
        await this.page.getByRole('button',{name:"Search"}).click();
    }
     getEmployeeRow(firstName:string,lastName:string){
          return this.page.locator('.oxd-table-body .oxd-table-row')
          .filter({hasText:firstName})
          .filter({hasText:lastName});
    }
}