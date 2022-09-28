//This test based on point 3.1.1 of the Test Plan. Related to testing the Viewing results. This case was suspicios after using VPN

const { test, expect } = require('@playwright/test');

test('Price matching between the tours list and tour details', async ({ page }) => {

    await page.goto('https://www.tourradar.com/d/europe');

    // create a locator
    const listPrice = await page.locator('.br__price-wrapper-price-description-value').first().innerText();
    await page.locator('text=View tour').first().click();
    // await page.waitForTimeout(4000);  
    // await expect(page).toHaveURL(/t/);
    await expect(page.locator(`text=${listPrice}`)).toBeVisible();

    // expect(listPrise).toBe(detailsPrise);
    // console.log(detailsPrise);


})
