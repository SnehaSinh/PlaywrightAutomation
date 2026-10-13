import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {

    }
    async navigateToLoginPage(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/")
    }

    async enterUsername(username:string){
        await this.page.getByPlaceholder("Username").fill(username)
    }
    async enterPassword(password:string){
        await this.page.getByPlaceholder("Password").fill(password)
    }
    async clickLogin(){
        await this.page.getByRole('button',{name:"Login"}).click();
    }

    async loginToApplication(username: string, password:string){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

}