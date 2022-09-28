//This test based on point 3.1.1 of the Test Plan. Related to testing the Filtering feature

const { test, expect } = require('@playwright/test');

test('filter paramether October 2022', async ({ page }) => {

    await page.goto('https://www.tourradar.com/d/europe');
    const getFilter = await page.locator('text=October 2022').first(); //here we trying to find some filter paramether
    const filterText = await getFilter.textContent();
    await getFilter.click();
    const filterUrl = filterText?.toLowerCase().replace(/\W/, '-') //here we trying to match found result to existing parameter displaying
    await expect(page).toHaveURL(`https://www.tourradar.com/d/europe#month=${filterUrl}`); //comparison
})
