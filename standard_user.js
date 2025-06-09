import { By, Browser, Key, Builder, until } from 'selenium-webdriver';
import { expect } from 'chai';  
import { printTestCases, setUp, login, addToCart, clickOnCart, checkout, fillInInformation, clickContinue, finishCheckout, saveScreenshot } from './utils.js';



//Global constants
const ADMIN_USERNAME = 'standard_user';
const ADMIN_PASSWORD = 'secret_sauce';
const FIRST_NAME = 'John';
const LAST_NAME = 'Doe';
const POSTAL_CODE = '12345';
const TIMEOUT_WAIT_TO_SEE_RESULT = 1000;


//array of messages of the test cases

let testCaseMessages = [];







/**
 * Test Case 01: Valid Checkout Happy Path
 * @param {string} username - The username to login with
 * @param {string} password - The password to login with
 * @param {string} firstName - The first name to fill in the information
 * @param {string} lastName - The last name to fill in the information
 * @param {string} postalCode - The postal code to fill in the information
 * @returns {Promise<void>} 
 * @description Main Scenario to test the website happy path
 */

async function TC_01_Valid_checkout(username, password, firstName, lastName, postalCode, numberOfItems) {
    let driver;
    try {


        // 1. Set up the driver
        driver = await setUp();
        console.log("Driver set up Test Case 01");

        // 2. Login
        await login(driver,username, password);

        // 3. Add to Cart
        await addToCart(driver,numberOfItems);

        // 4. Click on Cart
        await clickOnCart(driver);

        // 5. Checkout
        await checkout(driver);

        // 6. Fill in the information
        await fillInInformation(driver,firstName, lastName, postalCode);

        // 7. Click continue
        await clickContinue(driver);

        // 8. Finish checkout
        await finishCheckout(driver);

        // 9. Checkout complete
        let checkoutComplete = await driver.wait(until.elementLocated(By.xpath("//h2[@class='complete-header']")), 10000);
        let checkoutCompleteText = await checkoutComplete.getText();

        //debugging

        //assertion to check if the checkout is complete
        expect(checkoutCompleteText).to.equal('Thank you for your order!');

        //assertion to check if the test passed
        testCaseMessages.push('Test Case 01: Valid Checkout Happy Path Passed');

        //optional wait to see the result of the test
        await driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);


    } catch (error) {
        testCaseMessages.push('Test Case 01: Valid Checkout Happy Path Failed');
        await saveScreenshot(driver, 'TC_01_Valid_checkout');
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}





/**
 * Test Case 02: Invalid Login With Invalid Password
 * @param {string} username - The username to login with
 * @param {string} password - The password to login with
 * @returns {Promise<void>} 
 * @description Test Case 02: Invalid Login With Invalid Password
 */
async function TC_02_Invalid_Login_With_Invalid_Password(username, password){
    let errorMessage = '';
    let driver;
    try{
        driver = await setUp();
        console.log("Driver set up Test Case 02");
        await login(driver,username, password);
        let errorElement = await driver.wait(until.elementLocated(By.xpath("//h3[@data-test='error']")), 10000);
        errorMessage = await errorElement.getText();

        //assertion to check if the error message is correct
        expect(errorMessage).to.equal('Epic sadface: Username and password do not match any user in this service');


        //assertion to check if the test passed
        testCaseMessages.push('Test Case 02: Invalid Login With Invalid Password Passed');


        await driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);
    } catch (error) {
        testCaseMessages.push('Test Case 02: Invalid Login With Invalid Password Failed');
        await saveScreenshot(driver, 'TC_02_Invalid_Login_With_Invalid_Password');
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

/**
 * Test Case 03: Invalid Login With Empty Username And Password
 * @param {string} username - The username to login with
 * @param {string} password - The password to login with
 * @returns {Promise<void>} 
 * @description Test Case 03: Invalid Login With Empty Username And Password
 */
async function TC_03_Invalid_Login_With_Empty_Username_And_Password(username, password){
    let errorMessage = '';
    let driver;
    try {
        driver = await setUp();
        await login(driver,username, password);

       
        let errorElement = await driver.wait(until.elementLocated(By.xpath("//h3[@data-test='error']")), 10000);
        await driver.wait(until.elementIsVisible(errorElement), 10000);

        errorMessage = await errorElement.getText();

        expect(errorMessage).to.equal('Epic sadface: Username is required');

        //assertion to check if the test passed
        testCaseMessages.push('Test Case 03: Invalid Login With Empty Username And Password Passed');


        await driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);
    } catch (error) {
        testCaseMessages.push('Test Case 03: Invalid Login With Empty Username And Password Failed');
        await saveScreenshot(driver, 'TC_03_Invalid_Login_With_Empty_Username_And_Password');
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}



async function TC_04_Invalid_Checkout_With_Empty_Cart(username, password, firstName, lastName, postalCode, numberOfItems){
    let driver;

    try {
        // 1. Set up the driver
        driver = await setUp();

        // 2. Login with valid credentials
        await login(driver,username, password); 

        // 3. Add to Cart
        await addToCart(driver,numberOfItems);

        // 4. Click on Cart
        await clickOnCart(driver);

        // 5. Checkout
        await checkout(driver);

        // 6. Fill in the information
        await fillInInformation(driver,firstName, lastName, postalCode);

        // 7. Click continue
        await clickContinue(driver);

        // 8. Finish checkout
        await finishCheckout(driver);

        // 9. Checkout complete
        let checkoutComplete = await driver.wait(until.elementLocated(By.xpath("//h2[@class='complete-header']")), 10000);
        let checkoutCompleteText = await checkoutComplete.getText();
        //debugging

        //assertion to check if the checkout is not complete
        expect(checkoutCompleteText).to.not.equal('Thank you for your order!');

        //assertion to check if the test passed
        testCaseMessages.push('Test Case 04: Invalid Checkout With Empty Cart Passed');


        //optional wait to see the result of the test
        await driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);
    }
    catch (error) {
        testCaseMessages.push('Test Case 04: Invalid Checkout With Empty Cart Failed');
        await saveScreenshot(driver, 'TC_04_Invalid_Checkout_With_Empty_Cart');
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}




async function TC_05_Invalid_Checkout_With_Empty_Information(username, password, firstName, lastName, postalCode, numberOfItems) {
    let driver;
    try {
        // 1. Set up the driver
        driver = await setUp();

        // 2. Login
        await login(driver,username, password);

        // 3. Add to Cart
        await addToCart(driver,numberOfItems);

        // 4. Click on Cart
        await clickOnCart(driver);

        // 5. Checkout
        await checkout(driver);

        // 6. Fill in the information
        await fillInInformation(driver, '', '', '');

        // 7. Click continue
        await clickContinue(driver);

        // 8. Check if the error message is displayed
        let errorElement = await driver.wait(until.elementLocated(By.xpath("//h3[@data-test='error']")), 10000);
        let errorMessage = await errorElement.getText();

        //assertion to check if the error message is correct
        expect(errorMessage).to.equal('Error: First Name is required');

        //assertion to check if the test passed
        testCaseMessages.push('Test Case 05: Invalid Checkout With Empty Information Passed');

        //optional wait to see the result of the test
        await driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);


    } catch (error) {
        testCaseMessages.push('Test Case 05: Invalid Checkout With Empty Information Failed');
        await saveScreenshot(driver, 'TC_05_Invalid_Checkout_With_Empty_Information');
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

async function TC_06_Valid_See_Details_Of_Product(username, password, numberOfItems){
    let driver;
    try {
        // 1. Set up the driver
        driver = await setUp();
           
        
        // 2. Login
        await login(driver,username, password);
        
        for (let i = 0; i < numberOfItems; i++) {
            // 3. Get product elements (re-fetch each time to avoid stale elements)
            let products = await driver.wait(until.elementsLocated(By.xpath("//img[@class='inventory_item_img']")), 10000);

            // 4. Click on a product
            await driver.wait(until.elementIsVisible(products[i]), 10000);
            await products[i].click();

            // 5. Get and check the product details
            let productDetails = await driver.wait(until.elementLocated(By.xpath("//div[@data-test='inventory-item-desc']")), 10000);
            let productDetailsText = await productDetails.getText();

            // Assertion
            expect(productDetailsText).to.be.a('string').that.is.not.empty;

            // 6. Go back to product list
            await driver.navigate().back();
        }

        // Test passed
        testCaseMessages.push('Test Case 06: Valid See Details Of Product Passed');
        await driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);
    } catch (error) {
        testCaseMessages.push('Test Case 06: Valid See Details Of Product Failed');
        await saveScreenshot(driver, 'TC_06_Valid_See_Details_Of_Product');
        } finally {
        if (driver) {
            await driver.quit();
        }
    }
}








//--------------------------------- Suites ---------------------------------



/**
 * Checkout Suite to run the checkout suite
 * @returns {Promise<void>} 
 * @description Checkout Suite to run the checkout suite
 */
async function Checkout_Suite() {
    console.log("Running Checkout Suite .....");
    await TC_01_Valid_checkout(ADMIN_USERNAME, ADMIN_PASSWORD, FIRST_NAME, LAST_NAME, POSTAL_CODE, 6);
    await TC_04_Invalid_Checkout_With_Empty_Cart(ADMIN_USERNAME, ADMIN_PASSWORD, FIRST_NAME, LAST_NAME, POSTAL_CODE, 0);
    await TC_05_Invalid_Checkout_With_Empty_Information(ADMIN_USERNAME, ADMIN_PASSWORD, '', '', '', 4);
}


/**
 * Login Suite to run the login suite
 * @returns {Promise<void>} 
 * @description Login Suite to run the login suite
 */
async function Login_Suite() {
   
    console.log("Running Login Suite .....");
    await TC_02_Invalid_Login_With_Invalid_Password(ADMIN_USERNAME, 'invalid_password');   
    await TC_03_Invalid_Login_With_Empty_Username_And_Password('', '');
}




/**
 * All Products Suite to run the all products suite
 * @returns {Promise<void>} 
 * @description All Products Suite to run the all products suite
 */
async function All_Products_Suite(){
    console.log("Running All Products Suite .....");
    await TC_06_Valid_See_Details_Of_Product(ADMIN_USERNAME, ADMIN_PASSWORD ,  6);
}





//--------------------------------- Run All Suites ---------------------------------

/**
 * Run All Suites to run all suites
 * @returns {Promise<void>} 
 * @description Run All Suites to run all suites
 */
(async function runAllSuites() {
    await Login_Suite();
    await Checkout_Suite();
    await All_Products_Suite();
    printTestCases(testCaseMessages, "Standard User");
})();
