//This test based on point 3.1.1 of the Test Plan. Related to testing the Registration/Authorization feature

const { test, expect } = require('@playwright/test');
const { requestListenerDecorator } = require('../utils/requestListener');

test('negative case on login page', async ({ page }) => {

    await page.goto('https://www.tourradar.com/d/europe');

    // Expect a title "to contain" a substring. Trying to be sure that my environment is configured well and code is working at all
    await expect(page).toHaveTitle('10 Best Europe Tours & Trips 2022/2023 - TourRadar');

    // create a locator
    const getProfile = page.locator('.ao-header-navigation__profile');

    // trying to initiate login form
    await getProfile.hover();
    //await page.locator('.ao-header-navigation__dropdown--profile', { hasText: 'Log In' }).click();
    //await expect(page.locator('text=Log In').first()).toBeVisible();
    await page.locator('text=Log In').first().click();
    // Expects the URL to proceed to the login page. Entering wrong login data.
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('text=Customer Log In').first()).toBeVisible();
    await expect(page.locator('[placeholder="Enter your Email or Username"]').first()).toBeVisible();
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('dummy password');
    await page.locator('input[id="g_email"]').click();
    await page.locator('input[id="g_email"]').fill('dummy username');
    let count = requestListenerDecorator(page, 'https://www.tourradar.com', 'https://www.tourradar.com/travellers/login/all');
    await page.locator('#g_send').first().click();
    // await page.locator('#g_send').first().click(); // ALLOWS TO SEND MULTIPLE REQUESTS!!! Poterntial DoS -Vulnerability
    // const [request] = await Promise.all([
    //   page.waitForRequest('**/travellers/login/all'),
    // ]);
    // console.log(request.url());
    await expect(page.locator('text=Wrong login data.')).toBeVisible()
    //expecting that login will be called only once
    expect(count.value).toBe(1)

});


