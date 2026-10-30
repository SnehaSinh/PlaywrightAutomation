import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('valid login',async({page})=>{

    const loginpage=new LoginPage(page);

     //Given user navigates to the application url  
    await loginpage.navigateToLoginPage();
    //When user logs into the application using valid name and password
    await loginpage.loginToApplication("Admin","admin123")
   //Then verify that the Dashboard is visible and login is succesful
    await expect(page.getByRole('heading',{name:"Dashboard"})).toBeVisible();
});

test('invalid login',async({page})=>{
    const loginpage=new LoginPage(page);
 //Given user navigates to the application url   
await loginpage.navigateToLoginPage();
//Then the user enters Username and Password in lower case to make it invalid and clicks log in
await loginpage.loginToApplication("admin","Admin123")
//Then verify the error message on the Login screen
await expect(page.getByText("Invalid credentials")).toBeVisible();
});


test('invalid login with blank username',async({page})=>{
   const loginpage=new LoginPage(page);
 //Given user navigates to the application url   
await loginpage.navigateToLoginPage();
//Then the user keeps the Username blank with correct Password 
await loginpage.loginToApplication("","admin123");
//Then verify the error message on the Login screen
await expect(page.locator('//input[contains(@class,"oxd-input--error") and @placeholder="Username"]/parent::div/following-sibling::span[text()="Required"]')).toBeVisible();
//And verifies that Username field enters an error state
await expect(page.getByPlaceholder('Username'))
    .toHaveAttribute('class', /oxd-input--error/);
});


test('invalid login with blank password',async({page})=>{

  const loginpage=new LoginPage(page);
 //Given user navigates to the application url   
await loginpage.navigateToLoginPage();
//Then the user gives the correct Username but a blank password
await loginpage.loginToApplication("Admin","");
//Then verify the error message on the Login screen
await expect(page.locator('//input[contains(@class,"oxd-input--error") and @placeholder="Password"]/parent::div/following-sibling::span[text()="Required"]')).toBeVisible();
//And verifies that Username field enters an error stage
await expect(page.getByPlaceholder('Password'))
    .toHaveAttribute('class', /oxd-input--error/);
//And verify that the user stays in the login page whose heading is Login
await expect(page.getByRole('heading',{name:"Login"})).toBeVisible();
});

test('invalid login with both username and password blank',async({page})=>{
    const loginpage=new LoginPage(page)
//Given user navigates to the application url   
await loginpage.navigateToLoginPage();
//Then the user keeps the username and password blank
await loginpage.loginToApplication("","");
//Then verify two "Required" validation messages should be displayed, one for Username and one for Password
await expect (page.locator('//input[contains(@class,"oxd-input--error") ]/parent::div/following-sibling::span[text()="Required"]')).toHaveCount(2);
 
//And alsoverify that the user stays in the login page whose heading is Login
await expect(page.getByRole('heading',{name:"Login"})).toBeVisible();
}); 

