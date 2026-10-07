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