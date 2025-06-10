import { Builder, By, until, Key } from 'selenium-webdriver';
import fs from 'fs';

// Your credentials and target profile
const EMAIL = 'mohmost25@gmail.com';
const PASSWORD = 'Moh_2002126';
const PROFILE_URL = 'https://www.facebook.com/abdelrhman.mostafa.214889';
const MESSAGE_TEXT = 'Hello from Selenium automation 👋';

// Main function
async function sendFacebookMessage() {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        // Go to Facebook login
        await driver.get('https://www.facebook.com');
        await driver.sleep(2000);

        // Enter credentials
        const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
        await emailInput.sendKeys(EMAIL);

        const passInput = await driver.wait(until.elementLocated(By.id('pass')), 10000);
        await passInput.sendKeys(PASSWORD, Key.RETURN);

        // Wait for home to load
        await driver.wait(until.urlContains('facebook.com'), 15000);

        // Navigate to target profile
        await driver.get(PROFILE_URL);
        await driver.sleep(5000);

        // Try locating message button
        const messageButton = await driver.wait(
            until.elementLocated(By.xpath("//div[@aria-label='Message' or @aria-label='Send message']")),
            15000
        );

        await messageButton.click();

        // Wait for chat input area to appear
        const messageInput = await driver.wait(
            until.elementLocated(By.xpath("//p[contains(text(),'Aa') or @data-lexical-text='true']")),
            15000
        );

        // Type and send the message
        await messageInput.sendKeys(MESSAGE_TEXT, Key.RETURN);
        console.log("✅ Message sent!");

    } catch (err) {
        console.error("❌ Something went wrong:", err.message);

        // Take screenshot if error occurs
        const image = await driver.takeScreenshot();
        fs.writeFileSync('fb_error_screenshot.png', image, 'base64');
        console.log("🖼️ Screenshot saved as fb_error_screenshot.png");

    } finally {
        await driver.sleep(5000); // Wait a bit to see the result
        await driver.quit();
    }
}

sendFacebookMessage();
