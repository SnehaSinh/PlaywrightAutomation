import { test as base } from '@playwright/test';
import { PIMPage } from '../pages/PIMPage';
type MyFixtures = {
    pimpage: PIMPage;
};

export const test = base.extend<MyFixtures>({
     pimpage: async ({ page }, use) =>{
    const pimpage = new PIMPage(page);
    
        await use(pimpage);
     }
});