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
//Then verify that the Dashboard is not visible and so login is unsuccesful
await expect(page.getByRole('heading',{name:"Dashboard"})).toBeHidden;
});