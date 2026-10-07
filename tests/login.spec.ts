import { test, expect } from '@playwright/test';
test('valid login',async({page})=>{
 //Given user navigates to the application url   
await page.goto("https://opensource-demo.orangehrmlive.com/")
//When the user enters Username
await page.getByPlaceholder("Username").fill("Admin")
//And the user enters the Password
await page.getByPlaceholder("Password").fill("admin123")
//Then clicks on LoginButton
await page.getByRole('button',{name:"Login"}).click();
//Then verify that the Dashboard is visible and login is succesful
await expect(page.getByRole('heading',{name:"Dashboard"})).toBeVisible();
});

test('invalid login',async({page})=>{
 //Given user navigates to the application url   
await page.goto("https://opensource-demo.orangehrmlive.com/")
//When the user enters Username
await page.getByPlaceholder("Username").fill("admin")
//And the user enters the Password
await page.getByPlaceholder("Password").fill("Admin123")
//Then clicks on LoginButton
await page.getByRole('button',{name:"Login"}).click();
//Then verify the error message on the Login screen
await expect(page.getByText("Invalid credentials")).toBeVisible();
});


test('invalid login with blank username',async({page})=>{
//Given user navigates to the application url   
await page.goto("https://opensource-demo.orangehrmlive.com/")
//When the user keep Username as blank
await page.getByPlaceholder("Username").fill("")
//And the user enters the correct Password
await page.getByPlaceholder("Password").fill("admin123")
//Then clicks on LoginButton
await page.getByRole('button',{name:"Login"}).click();
//Then verify the error message on the Login screen
await expect(page.locator('//input[contains(@class,"oxd-input--error") and @placeholder="Username"]/parent::div/following-sibling::span[text()="Required"]')).toBeVisible();
//And verifies that Username field enters an error stage
await expect(page.getByPlaceholder('Username'))
    .toHaveAttribute('class', /oxd-input--error/);
});


test('invalid login with blank password',async({page})=>{
//Given user navigates to the application url   
await page.goto("https://opensource-demo.orangehrmlive.com/")
//When the user keep Username as blank
await page.getByPlaceholder("Username").fill("Admin")
//And the user enters the correct Password
await page.getByPlaceholder("Password").fill("")
//Then clicks on LoginButton
await page.getByRole('button',{name:"Login"}).click();
//Then verify the error message on the Login screen
await expect(page.locator('//input[contains(@class,"oxd-input--error") and @placeholder="Password"]/parent::div/following-sibling::span[text()="Required"]')).toBeVisible();
//And verifies that Username field enters an error stage
await expect(page.getByPlaceholder('Password'))
    .toHaveAttribute('class', /oxd-input--error/);
//And verify that the user stays in the login page whose heading is ogin
await expect(page.getByRole('heading',{name:"Login"})).toBeVisible();
});
