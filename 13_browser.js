import { browser } from 'k6/browser';
import { check } from 'k6';

/**
 * K6 browser test script demonstrating multiple test cases within one scenario.
 * Test Case 1: Login as admin and verify successful login.
 * Test Case 2: Assert welcome message, take screenshot, and logout.
 */

export const options = {
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            vus: 5, //Simulate 5 virtual users
            iterations: 10, //Each VU runs once
            options: {
                browser: {
                    type: 'chromium'
                }
            },
        },
    },
};

/**
 * Test Case 1: Login as admin, assert successful login, and take a screenshot.
 * Steps:
 *  - Go to the login page
 *  - Enter credentials
 *  - Click submit
 *  - Wait and take a screenshot
 *  - Assert URL contains 'admin.php'
 */

async function testLogin(page) {
    await page.goto('https://test.k6.io/my_messages.php');
    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');
    await page.locator('[type="submit"]').click();
    await page.waitForTimeout(1000);
    //  create the screenshot folder first
    await page.screenshot({ path: './screenshots/login.png' });

    check(page.url(), {
        'Login successful': (url) => url.includes('admin.php'),
    });
}

/**
 * Test Case 2: Assert welcome message, take a screenshot, and logout.
 * Steps:
 *  - Wait for the welcome message ("Welcome, admin!") to appear
 *  - Assert the text is present
 *  - Take a screenshot
 *  - Click the Logout button
 *  - Wait to ensure logout is processed
 */
async function testAssertWelcomeAndLogout(page) {
    // Wait for and assert welcome text
    const welcomeLocator = page.locator('h2');
    await welcomeLocator.waitFor({ state: 'visible', timeout: 3000 });
    const welcomeText = await welcomeLocator.textContent();
    check(welcomeText, {
        'Welcome message shown': (txt) => txt && txt.includes('Welcome, admin!'),
    });



    // Click Logout button
    await page.locator('form[action="/my_messages.php"] input[type="submit"]').click();
    await page.waitForTimeout(1000);
     await page.screenshot({ path: './screenshots/logout.png' });
}

/**
 * Main test flow: calls each test case in sequence for every virtual user.
 */
export default async function () {
    const page = await browser.newPage();
    try {
        await testLogin(page);                // Test Case 1: Login
        await testAssertWelcomeAndLogout(page); // Test Case 2: Welcome + Logout
    } 
    finally {
        await page.close();
    }
} 
