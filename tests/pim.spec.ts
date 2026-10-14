import { test, expect } from '@playwright/test';
import { PIMPage } from '../pages/PIMPage';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);

    await loginpage.navigateToLoginPage();
    await loginpage.loginToApplication("Admin", "admin123");
});

test('navigate to pim',async({page})=>{
  const pimpage=new PIMPage(page);


//Given the user is successfully logged in verify that dashboard is visible
await expect(page.getByRole('heading',{name:"Dashboard"})).toBeVisible();
//When the user clicks "PIM" from the left navigation menu
await pimpage.navigateToPIM();
//Then the PIM page should be displayed
await expect(page.getByRole('link',{name:"PIM"})).toBeVisible();
//And the Employee Information section should be visible
await expect(page.getByRole('heading',{name:"Employee Information"})).toBeVisible(); 

});


test('search employee by name',async({page})=>{
  const pimpage=new PIMPage(page);
//When the user clicks on "PIM" from the left navigation menu
await pimpage.navigateToPIM();
//And enters the name in the Employee Name field
await pimpage.searchEmployeeByName("Charles Carter")
//Then selects the name from the dropdown list
await pimpage.selectNameFromDropdown("Charles Carter");
//And then the user clicks on the Search button
await pimpage.clickSearch();
//Then The user verifies that the record is returned
await expect(
  page.getByText('(1) Record Found', { exact: true })
).toBeVisible();
//And then verifies that the record returned is the name that was selected
const employeeRow = pimpage.getEmployeeRow("Charles", "Carter");

await expect(employeeRow).toHaveCount(1);
await expect(employeeRow.getByText("Charles", { exact: true })).toBeVisible();
await expect(employeeRow.getByText("Carter", { exact: true })).toBeVisible();
})
  