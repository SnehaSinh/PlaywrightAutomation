import { test, expect } from '@playwright/test';
test('navigate to pim',async({page})=>{
 //Given user navigates to the application url   
await page.goto("https://opensource-demo.orangehrmlive.com/")
//When the user enters Username
await page.getByPlaceholder("Username").fill("Admin")
//And the user enters the Password
await page.getByPlaceholder("Password").fill("admin123")
//And clicks on LoginButton
await page.getByRole('button',{name:"Login"}).click();
//Then verify that the Dashboard is visible and login is successful
await expect(page.getByRole('heading',{name:"Dashboard"})).toBeVisible();
//When the user clicks "PIM" from the left navigation menu
await page.getByRole('link',{name:'PIM'}).click();
//Then the PIM page should be displayed
await expect(page.getByRole('link',{name:"PIM"})).toBeVisible();
//And the Employee Information section should be visible
await expect(page.getByRole('heading',{name:"Employee Information"})).toBeVisible(); 

});

test('search employee by name',async({page})=>{
 //Given user navigates to the application url   
await page.goto("https://opensource-demo.orangehrmlive.com/")
//When the user enters Username
await page.getByPlaceholder("Username").fill("Admin")
//And the user enters the Password
await page.getByPlaceholder("Password").fill("admin123")
//And clicks on LoginButton
await page.getByRole('button',{name:"Login"}).click();
//Then the user clicks on "PIM" from the left navigation menu
await page.getByRole('link',{name:'PIM'}).click();
//And enters the name in the Employee Name field
await page.locator('//label[normalize-space()="Employee Name"]/ancestor::div[contains(@class,"oxd-grid-item")][1]//input'
).fill('Charles Carter');
//Then selects the name from the dropdown list
await page.getByRole('listbox')
    .getByRole('option', { name: 'Charles Carter' })
    .click();
//And then the user clicks on the Search button
await page.getByRole('button',{name:"Search"}).click();
//Then The user verifies that the record is returned
await expect(
  page.getByText('(1) Record Found', { exact: true })
).toBeVisible();
//And then verifies that the record returned is the name that was selected
const employeeRow= page.locator('.oxd-table-body .oxd-table-row')
.filter({hasText:'Charles'})
.filter({hasText:'Carter'});
await expect(employeeRow).toHaveCount(1);
await expect(employeeRow.getByText('Charles', { exact: true })).toBeVisible();
await expect(employeeRow.getByText('Carter', { exact: true })).toBeVisible();

})
