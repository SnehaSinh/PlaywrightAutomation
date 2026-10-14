import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import { PIMPage } from '../pages/PIMPage';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginpage = new LoginPage(page);

  await loginpage.navigateToLoginPage();
  await loginpage.loginToApplication("Admin", "admin123");
});

test('navigate to pim', async ({ page, pimpage }) => {
  //Given the user is successfully logged in verify that dashboard is visible
  await expect(page.getByRole('heading', { name: "Dashboard" })).toBeVisible();
  //When the user clicks "PIM" from the left navigation menu
  await pimpage.navigateToPIM();
  //Then the PIM page should be displayed
  await expect(page.getByRole('link', { name: "PIM" })).toBeVisible();
  //And the Employee Information section should be visible
  await expect(page.getByRole('heading', { name: "Employee Information" })).toBeVisible();

});


test('search employee by name', async ({ page, pimpage }) => {
  //Given the user is successfully logged in and clicks on "PIM" from the left navigation menu
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

test('add employee in pim', async ({ page, pimpage }) => {
  //Given the user is successfully logged in and navigates to pim page
  await pimpage.navigateToPIM();
  //Then the PIM page should be displayed
  await expect(page.getByRole('link', { name: "PIM" })).toBeVisible();
  //And the user clicks on Add button to Add Employee
  await pimpage.navigateToAddEmployee();
  //Then verifies that the title on the page is Add Employee
  await expect(page.getByRole("heading", { name: "Add Employee", exact: true })).toBeVisible();
  //And then enter employeeDetails
  const firstName = `Test${Date.now()}`;
  const lastName = 'Automation';
  await pimpage.enterEmployeeDetails(firstName, lastName);
  //Then save the details
  await pimpage.clickSave();
  //And verify the save is successful
  await expect(page.getByText("Successfully Saved")).toBeVisible();
  //Also verify that the application navigates to Employee Personal Details page
  await expect(page.getByRole("heading", { name: "Personal Details" }))
})

test('search newly created employee', async ({ page, pimpage }) => {
  //Given the user is successfully logged in and navigates to the PIM page
  await pimpage.navigateToPIM();
  //Then the user clicks on Add button to Add Employee
  await pimpage.navigateToAddEmployee();
  //Then the user creates employee
  const firstName = `Test${Date.now()}`;
  const lastName = 'Automation';
  await pimpage.enterEmployeeDetails(firstName, lastName);
  //Then the user saves the details
  await pimpage.clickSave();
  //And then verify that the application navigates to Employee Personal Details page
   await expect(page.getByRole("heading", { name: "Personal Details" })).toBeVisible();
   console.log("Employee saved:", firstName, lastName);
  console.log("Employee details URL:", page.url());
  //Then navigate to PIM page to do search operation
   await pimpage.navigateToPIM();
  //And the user searches for the newly created employee
  await pimpage.searchEmployeeByName(`${firstName}`)
  //Then selects the name from the dropdown list
  await pimpage.selectNameFromDropdown(`${firstName} ${lastName}`);
  //And then the user clicks on the Search button
  await pimpage.clickSearch();
  //Then The user verifies that the record is returned
  await expect(
    page.getByText('(1) Record Found', { exact: true })
  ).toBeVisible();
  //And then verifies that the record returned is the name that was selected
  const employeeRow = pimpage.getEmployeeRow(`${firstName}`, `${lastName}`);

  await expect(employeeRow).toHaveCount(1);
  await expect(employeeRow.getByText(`${firstName}`, { exact: true })).toBeVisible();
  await expect(employeeRow.getByText(`${lastName}`, { exact: true })).toBeVisible();
})

