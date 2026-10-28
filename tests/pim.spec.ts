import { test } from '../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { generateEmployeeAdditionalData, generateEmployeeName, generateRandomLastName } from '../helpers/employeeDataHelper'
import { generateUpdatedEmployeeData } from '../helpers/employeeDataHelper';

test.beforeEach(async ({ page }) => {
  const loginpage = new LoginPage(page);

  await loginpage.navigateToLoginPage();
  await loginpage.loginToApplication("Admin", "admin123");
});

test('navigate to pim', async ({ page, pimpage }) => {
  //Given the user is successfully logged in verify that dashboard is visible
  await expect(pimpage.dashboardHeading).toBeVisible();
  //When the user clicks "PIM" from the left navigation menu
  await pimpage.navigateToPIM();
  //Then the PIM page should be displayed
  await expect(pimpage.pimHeading).toBeVisible();
  //And the Employee Information section should be visible
  await expect(pimpage.employeeInformationHeading).toBeVisible();

});


test('add employee in pim', async ({ page, pimpage }) => {
  //Given the user is successfully logged in and navigates to pim page
  await pimpage.navigateToPIM();
  //Then the PIM page should be displayed
  await expect(pimpage.pimHeading).toBeVisible();
  //And the user clicks on Add button to Add Employee
  await pimpage.navigateToAddEmployee();
  //Then verifies that the title on the page is Add Employee
  await expect(pimpage.addEmployeePageTitle).toBeVisible();
  //And then enter employeeDetails
  const { firstName, lastName } = generateEmployeeName();
  await pimpage.enterEmployeeDetails(firstName, lastName);
  //Then save the details
  await pimpage.clickSave();
  //And verify the save is successful
  await expect(pimpage.successfullySaved).toBeVisible();
  //Also verify that the application navigates to Employee Personal Details page
  await expect(pimpage.personalDetailsHeading).toBeVisible({timeout:15000});
})

test('search newly created employee', async ({ page, pimpage }) => {
  //Given the user is successfully logged in and navigates to the PIM page
  await pimpage.navigateToPIM();
  //Then the user clicks on Add button to Add Employee
  await pimpage.navigateToAddEmployee();
  //Then the user creates employee
  const { firstName, lastName } = generateEmployeeName();
  await pimpage.enterEmployeeDetails(firstName, lastName);
  //Then the user saves the details
  await pimpage.clickSave();
  //And then verify that the application navigates to Employee Personal Details page
  await expect(pimpage.personalDetailsHeading).toBeVisible({timeout:15000});
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


test('update newly created employee last name ,license number, license expiry date and marriage status ', async ({ page, pimpage }) => {

  // Given the user is logged in and navigates to PIM
  await pimpage.navigateToPIM();

  // When the user clicks Add Employee
  await pimpage.navigateToAddEmployee();

  // And creates an employee with dynamic data
  const { firstName, lastName } = generateEmployeeName();

  await pimpage.enterEmployeeDetails(firstName, lastName);
  await pimpage.clickSave();

  // Then verify the Personal Details page is displayed
  await pimpage.verifyPersonalDetailsPageLoaded(lastName)
  // When the user updates the employee details
  const updatedData =  generateUpdatedEmployeeData();
  await pimpage.updateEmployeePersonalDetails(updatedData);

  // Then verify the new values are entered correctly
  await expect(pimpage.lastNameInput)
    .toHaveValue(updatedData.lastName);

  await expect(pimpage.licenseNumberInput)
    .toHaveValue(updatedData.licenseNumber);

  await expect(pimpage.licenseExpiryDateInput)
    .toHaveValue(updatedData.licenseExpiryDate);

  await expect(pimpage.marriageStatusInput)
    .toHaveText(updatedData.maritalStatus);



  // When the user saves the updated details
  await pimpage.saveUpdatedPersonalDetails();

  // Then verify the update was successful
  await expect(pimpage.successfullyUpdatedMessage).toBeVisible();

  // Reload the employee page
  await page.reload();

  // Then verify the updated last name was saved
  await expect(pimpage.lastNameInput)
    .toHaveValue(updatedData.lastName);

  // And verify the updated license number was saved
  await expect(pimpage.licenseNumberInput)
    .toHaveValue(updatedData.licenseNumber);

  // And verify the updated license expiry date was saved
  await expect(pimpage.licenseExpiryDateInput)
    .toHaveValue(updatedData.licenseExpiryDate);

  //And verify the updated marital status was saved
  await expect(pimpage.marriageStatusInput)
    .toHaveText(updatedData.maritalStatus);

});

test('update newly created employee gender,nationality and date of birth ', async ({ page, pimpage }) => {

  // Given the user is logged in and navigates to PIM
  await pimpage.navigateToPIM();

  // When the user clicks Add Employee
  await pimpage.navigateToAddEmployee();

  // And creates an employee with dynamic data
  const { firstName, lastName } = generateEmployeeName();

  await pimpage.enterEmployeeDetails(firstName, lastName);
  await pimpage.clickSave();

  // Then verify the Personal Details page is displayed
  await pimpage.verifyPersonalDetailsPageLoaded(lastName)

  // When the user updates the employee additional details
  const updatedAdditionalData = generateEmployeeAdditionalData();
  await pimpage.updateEmployeeAdditionalDetails(updatedAdditionalData);


  // Verify gender is selected
  await expect(
    pimpage.getGenderRadio(updatedAdditionalData.gender).locator('input')
  ).toBeChecked();
  // Verify Date of birth is filled 
  await expect(pimpage.dateOfBirthInput)
    .toHaveValue(updatedAdditionalData.dateOfBirth);
  //Verify Nationality gets randomly populated
  const selectedNationality = await pimpage.selectRandomNationality();

  await expect(pimpage.nationalityInput)
    .toHaveText(selectedNationality);

  // When the user saves the updated details
  await pimpage.saveUpdatedPersonalDetails();

  // Then verify the update was successful
  await expect(pimpage.successfullyUpdatedMessage).toBeVisible();

  // Reload the employee page
  await page.reload();
  // Verify gender is selected
  await expect(
    pimpage.getGenderRadio(updatedAdditionalData.gender).locator('input')
  ).toBeChecked();
  // Verify Date of birth is filled 
  await expect(pimpage.dateOfBirthInput)
    .toHaveValue(updatedAdditionalData.dateOfBirth);

  await expect(pimpage.nationalityInput)
    .toHaveText(selectedNationality);

})

test('delete newly created employee', async ({ page, pimpage }) => {

  // Given the user is logged in and navigates to PIM
  await pimpage.navigateToPIM();

  // When the user clicks Add Employee
  await pimpage.navigateToAddEmployee();

  // And creates an employee with dynamic data
  const { firstName, lastName } = generateEmployeeName();

  await pimpage.enterEmployeeDetails(firstName, lastName);
  await pimpage.clickSave();

  // Then verify the Personal Details page is displayed
  await pimpage.verifyPersonalDetailsPageLoaded(lastName)

  //Then user navigate backs to PIM page
  await pimpage.navigateToPIM();

  //And the user searches for the newly created employee
  await pimpage.searchEmployeeByName(`${firstName}`)
  //Then selects the name from the dropdown list
  await pimpage.selectNameFromDropdown(`${firstName} ${lastName}`);
  //And then the user clicks on the Search button
  await pimpage.clickSearch();
  //And then verifies that the record returned is the name that was selected
  const employeeRow = pimpage.getEmployeeRow(`${firstName}`, `${lastName}`);
  await expect(employeeRow).toHaveCount(1);
  //And then employee clicks on Delete button
  await pimpage.clickDeleteEmployee(firstName, lastName);
  //And then confirms deletion
  await pimpage.confirmDeleteEmployee();
  //Then verify the Successfully deleted Toast message
  await expect(pimpage.successfullyDeletedMessage).toBeVisible();
  //And navigates back to PIM page to search for deleted employee
  await pimpage.navigateToPIM();
  await pimpage.searchEmployeeByName(`${firstName}`)
//And then the user clicks on the Search button
  await pimpage.clickSearch();
 //Then verify that no record is found 
 await expect (pimpage.noRecordsFoundMessage).toBeVisible();
   const url=page.url;
  console.log(url);
})