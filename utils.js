//imports
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
// import { Browser, Edge } from 'selenium-webdriver/chrome';
import Chalk from 'chalk';
import fs from 'fs';
import path from 'path';





/**
 * Set up the driver and navigate to the website
 * @returns {Promise<void>} 
 * @description Set up the driver and navigate to the website
 */
export async function setUp() {
    console.log("Setting up the driver... Edge Browser from SetUp Function");// debug

    let driver = await new Builder().forBrowser('MicrosoftEdge').build();
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get('https://www.saucedemo.com/');
    console.log("Driver set up Test Case 01");
    return driver;
}





/** 
 * Login Function to login to the website
 * @param {WebDriver} driver - The driver to use
 * @param {string} username - The username to use
 * @param {string} password - The password to use
 * @returns {Promise<void>} 
 * @description Login Function to login to the website
 */
export async function login(driver, username, password){
    const usernameInput = await driver.findElement(By.id('user-name'));
    await usernameInput.sendKeys(username);
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys(password);
    const loginButton = await driver.findElement(By.id('login-button'));
    await driver.wait(until.elementIsEnabled(loginButton), 10000);
    await loginButton.click();

    //optional wait to see the result of the login
    // await driver.sleep(5000);
}




/**
 * Add to Cart Function to add items to the cart
 * @param {number} numberOfItems - The number of items to add to the cart
 * @returns {Promise<void>} 
 * @description Add to Cart Function to add items to the cart
 */
export async function addToCart(driver, numberOfItems){
    let items = await driver.findElements(By.xpath("//button[contains(@class, 'btn_inventory')]"));

    for(let i = 0; i < numberOfItems; i++){
        await driver.wait(until.elementIsVisible(items[i]), 10000);
        await items[i].click();
    }
}


/**
 * Click On Cart Function to click the cart button
 * @returns {Promise<void>} 
 * @description Click On Cart Function to click the cart button
 */
export async function clickOnCart(driver){
    let cart = await driver.findElement(By.xpath("//a[@class='shopping_cart_link']"));
    await driver.wait(until.elementIsVisible(cart), 10000);
    await cart.click();
}


/**
 * Checkout Function to click the checkout button
 * @returns {Promise<void>} 
 * @description Checkout Function to click the checkout button
 */
export async function checkout(driver){
    let checkout = await driver.findElement(By.xpath("//button[@id='checkout']"));
    await driver.wait(until.elementIsVisible(checkout), 10000);
    await checkout.click();
}


/**
 * Fill In Information Function to fill in the information
 * @param {string} name - The name to fill in the information
 * @param {string} lastName - The last name to fill in the information
 * @param {string} postalCode - The postal code to fill in the information
 * @returns {Promise<void>} 
 * @description Fill In Information Function to fill in the information
 */
export async function fillInInformation(driver, name, lastName, postalCode){
    let firstName = await driver.findElement(By.id('first-name'));
    await driver.wait(until.elementIsVisible(firstName), 10000);
    await firstName.sendKeys(name);
    let lastNameInput = await driver.findElement(By.id('last-name'));
    await driver.wait(until.elementIsVisible(lastNameInput), 10000);
    await lastNameInput.sendKeys(lastName);
    let postalCodeInput = await driver.findElement(By.id('postal-code'));
    await driver.wait(until.elementIsVisible(postalCodeInput), 10000);
    await postalCodeInput.sendKeys(postalCode);
}


/**
 * Click Continue Function to click the continue button
 * @returns {Promise<void>} 
 * @description Click Continue Function to click the continue button
 */
export async function clickContinue(driver){
    let continueButton = await driver.findElement(By.id('continue'));
    await driver.wait(until.elementIsVisible(continueButton), 10000);
    await continueButton.click();
}


/**
 * Finish Checkout Function to finish the checkout
 * @returns {Promise<void>} 
 * @description Finish Checkout Function to finish the checkout
 */
export async function finishCheckout(driver){
    let finishButton = await driver.findElement(By.id('finish'));
    await driver.wait(until.elementIsVisible(finishButton), 10000);
    await finishButton.click();
}






/*
* @param {Array} arrOfTestCases - Array of test cases
* @description Print the test cases in a formatted way
*/
export function printTestCases(arrOfTestCases , title) {
    console.log(Chalk.hex('#D3D3D3')('=======================================================================================')); // orange header
    console.log(Chalk.bold.hex('#A9A9A9')(`===== Test Cases of: ${title} =====`));

    // Sort based on the test case number
    let sortedMessages = arrOfTestCases.slice().sort((a, b) => {
        let numA = parseInt(a.match(/Test Case (\d+)/)?.[1] || 0);
        let numB = parseInt(b.match(/Test Case (\d+)/)?.[1] || 0);
        return numA - numB;
    });

    // Print each test case with color
    for (let msg of sortedMessages) {
        if (msg.endsWith('Passed')) {
            console.log('\x1b[32m%s\x1b[0m', msg); // green
        } else if (msg.endsWith('Failed')) {
            console.log('\x1b[31m%s\x1b[0m', msg); // red
        } else {
            console.log(msg); // default color
        }
    }

    console.log(Chalk.hex('#D3D3D3')("======================================================================================="));
}



/**
 * Saves a screenshot and deletes any existing screenshots with the same test prefix
 * @param {WebDriver} driver - Selenium driver instance
 * @param {string} testName - Unique test name or prefix
 */
export async function saveScreenshot(driver, testName) {
    const screenshotDir = './screenshots';
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    // Remove existing screenshots with same prefix
    const files = fs.readdirSync(screenshotDir);
    for (const file of files) {
        if (file.startsWith(testName)) {
            fs.unlinkSync(path.join(screenshotDir, file));
        }
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(screenshotDir, `${testName}_${timestamp}.png`);
    const image = await driver.takeScreenshot();
    fs.writeFileSync(filename, image, 'base64');
    console.log(`📸 Screenshot saved to ${filename}`);
}


export function clearScreenshotsDirectory() {
    const screenshotDir = './screenshots';

    if (fs.existsSync(screenshotDir)) {
        const files = fs.readdirSync(screenshotDir);
        for (const file of files) {
            const filePath = path.join(screenshotDir, file);
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        }
        console.log(`🧹 Cleared all files from ${screenshotDir}`);
    } else {
        console.log(`⚠️ Directory ${screenshotDir} does not exist.`);
    }
}