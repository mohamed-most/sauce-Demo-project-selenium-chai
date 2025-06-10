import { login, printTestCases, saveScreenshot, setUp ,lowest_price_item_placed_first } from "./utils.js";
import { expect } from "chai";
import { By, Browser, Key, Builder, until } from 'selenium-webdriver';






const USERNAME = 'error_user';
const PASSWORD = 'secret_sauce';
const FIRST_NAME = 'John';
const LAST_NAME = 'Doe';
const POSTAL_CODE = '12345';
const TIMEOUT_WAIT_TO_SEE_RESULT = 1000;

const INVENTORY_PAGE_URL = 'https://www.saucedemo.com/inventory.html';

//array of messages of the test cases

let testCaseMessages = [];





//---------------------------------- Test Cases  Login Error User----------------------------------
/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
//Test Case 01: Invalid Login With Invalid Password
async function TC_10_Invalid_Login_With_Invalid_Password(username, password){
    let driver;
    try{
    //1. set up the driver
     driver = await setUp();

    //2. login with the invalid password
    await login(driver, username, password);
    
    //3. wait for the error message
    await driver.wait(until.elementLocated(By.css('h3[data-test="error"]')), 1000);
    //4. get the error message
    let errorMessage = await driver.findElement(By.css('h3[data-test="error"]')).getText();
    //5. check if the error message is correct
    expect(errorMessage).to.be.equal.a('string').contain('Epic sadface');
    //6. push message to the test case messages
    testCaseMessages.push(`TC_10_Invalid_Login_With_Invalid_Password: Passed`);


}catch(error){
        testCaseMessages.push(`TC_10_Invalid_Login_With_Invalid_Password: Failed`);
        await driver.sleep(1000);
        saveScreenshot(driver, 'TC_10_Invalid_Login_With_Invalid_Password');
    }
    finally{
        await driver.quit();
    }
}


/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
//Test Case 02: Invalid Login With Invalid Username
async function TC_11_Invalid_Login_With_Invalid_Username(username, password){
    let driver;
    try{
    //1. set up the driver
     driver = await setUp();

    //2. login with the invalid username
    await login(driver, username, password);
    
    //3. wait for the error message
    await driver.wait(until.elementLocated(By.css('h3[data-test="error"]')), 1000);
    //4. get the error message
    let errorMessage = await driver.findElement(By.css('h3[data-test="error"]')).getText();
    //5. check if the error message is correct
    expect(errorMessage).to.be.equal.a('string').contain('Epic sadface');
    //6. push message to the test case messages
    testCaseMessages.push(`TC_11_Invalid_Login_With_Invalid_Username: Passed`);

    }catch(error){
        testCaseMessages.push(`TC_11_Invalid_Login_With_Invalid_Username: Failed`);
        await driver.sleep(1000);
        saveScreenshot(driver, 'TC_11_Invalid_Login_With_Invalid_Username');
    }
    finally{
        await driver.quit();
    }
}


/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
async function Tc_12_valid_login_with_valid_credentials(username, password){
    let driver;
    try{
    //1. set up the driver
     driver = await setUp();
    //2. login with the valid credentials
    await login(driver, username, password);
    //3. push message to the test case messages
    await driver.wait(until.urlIs(INVENTORY_PAGE_URL), 1000);
    //4. check if the inventory page is loaded
    let currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.be.equal(INVENTORY_PAGE_URL);
    testCaseMessages.push(`TC_12_Valid_Login_With_Valid_Credentials: Passed`);

    }catch(error){  
        testCaseMessages.push(`TC_12_Valid_Login_With_Valid_Credentials: Failed`);
        await driver.sleep(1000);
        saveScreenshot(driver, 'TC_12_Valid_Login_With_Valid_Credentials');
    }
    finally{
        await driver.quit();
    }
}

//---------------------------------- End of Test Cases  Login Error User----------------------------------


//---------------------------------- Test Cases  Add To Cart Error User----------------------------------

async function TC_13_Valid_Add_To_Cart_In_Product_Page_1_clicks(username, password){
    let driver;
    let itemNumber = 0;
    try{
    //1. set up the driver
     driver = await setUp();
    //2. login with the valid credentials
    await login(driver, username, password);
    
    //3.get addToCart buttons
    let addToCartButtons = await driver.wait(until.elementsLocated(By.xpath('//button[contains(@class, "btn_inventory ")]')), 1000);
    //4. click on the addToCart button
    for (let i = 0; i < addToCartButtons.length; i++) {
        itemNumber = i + 1;
        
        // locate fresh button before click
        let buttons = await driver.findElements(By.xpath('//button[contains(@class, "btn_inventory ")]'));
        let textBeforeClick = await buttons[i].getText();
    
        await buttons[i].click();
    
        // locate fresh button after click
        let updatedButtons = await driver.findElements(By.xpath('//button[contains(@class, "btn_inventory ")]'));
        let textAfterClick = await updatedButtons[i].getText();
    
        expect(textBeforeClick).to.not.equal(textAfterClick);
    }
    
    testCaseMessages.push(`TC_13_Valid_Add_To_Cart_In_Product_Page: Passed`);

    }catch(error){
        testCaseMessages.push(`TC_13_Valid_Add_To_Cart_In_Product_Page item number ${itemNumber}: Failed`);
        await driver.sleep(1000);
        saveScreenshot(driver, 'TC_13_Valid_Add_To_Cart_In_Product_Page');
    }
    finally{
        await driver.quit();
    }
}


async function TC_14_Valid_Add_To_Cart_In_Product_Page_2_clicks(username, password){
    let driver;
    let itemNumber = 0;
    try{
    //1. set up the driver
     driver = await setUp();
    //2. login with the valid credentials
    await login(driver, username, password);
    
    //3.get addToCart buttons
    let addToCartButtons = await driver.wait(until.elementsLocated(By.xpath('//button[contains(@class, "btn_inventory ")]')), 1000);
    //4. click on the addToCart button
    for (let i = 0; i < addToCartButtons.length; i++) {
        itemNumber = i + 1;
        
        // locate fresh button before click
        let buttons = await driver.findElements(By.xpath('//button[contains(@class, "btn_inventory ")]'));
        let textBeforeClick = await buttons[i].getText();
    
        await buttons[i].click();
    
        // locate fresh button after click
        let updatedButtons = await driver.findElements(By.xpath('//button[contains(@class, "btn_inventory ")]'));
        let textAfterClick = await updatedButtons[i].getText();


        //click again so it should be removed from the cart
        await buttons[i].click();
    
        //locate fresh button after click
        let updatedButtons2 = await driver.findElements(By.xpath('//button[contains(@class, "btn_inventory ")]'));
        let textAfterClick2 = await updatedButtons2[i].getText();

        expect(textBeforeClick).to.not.equal(textAfterClick2);
    }
    
    testCaseMessages.push(`TC_14_Valid_Add_To_Cart_In_Product_Page: Passed`);

    }catch(error){
        testCaseMessages.push(`TC_14_Valid_Add_To_Cart_In_Product_Page item number ${itemNumber}: Failed`);
        await driver.sleep(1000);
        saveScreenshot(driver, 'TC_14_Valid_Add_To_Cart_In_Product_Page');
    }
    finally{
        await driver.quit();
    }
}

//---------------------------------- End of Test Cases  Add To Cart Error User----------------------------------


//---------------------------------- Test Cases Sorting Functionality Error User----------------------------------


// Main test function
async function TC_15_Valid_Sorting_Functionality_In_Product_Page_Sort_By_Low_To_High(username, password) {
    let driver;
    try {
        driver = await setUp();

        // 1. Log in
        await login(driver, username, password);

        // 2. Wait for sorting dropdown and click
        const dropdown = await driver.wait(until.elementLocated(By.css('select.product_sort_container')), 3000);
        await dropdown.click();

        // 3. Select "Price (low to high)" option by value or visible text
        const lowToHighOption = await driver.findElement(By.css('option[value="lohi"]'));
        await lowToHighOption.click();

        // 4. Wait for prices to update
        await driver.sleep(1000);

        // 5. Check if sorted correctly
        const isSorted = await lowest_price_item_placed_first(driver);
        console.log("Lowest price item placed first:", isSorted);
        expect(isSorted).to.be.true;

        testCaseMessages.push(`TC_15_Valid_Sorting_Functionality_In_Product_Page_Sort_By_Low_To_High: Passed`);
    } catch (error) {
        testCaseMessages.push(`TC_15_Valid_Sorting_Functionality_In_Product_Page_Sort_By_Low_To_High: Failed`);
        await driver.sleep(1000); //wait to be able to snppt the alert 
        saveScreenshot(driver, 'TC_15_Valid_Sorting_Functionality_In_Product_Page_Sort_By_Low_To_High');
    } finally {
        if (driver) await driver.quit();
    }
}








//---------------------------------- Suites ----------------------------------

async function login_suite(){
    await TC_10_Invalid_Login_With_Invalid_Password(USERNAME, "123456");
    await TC_11_Invalid_Login_With_Invalid_Username("M", PASSWORD);
    await Tc_12_valid_login_with_valid_credentials(USERNAME, PASSWORD);
}

async function addToCart_suite(){
    await TC_13_Valid_Add_To_Cart_In_Product_Page_1_clicks(USERNAME, PASSWORD);
    await TC_14_Valid_Add_To_Cart_In_Product_Page_2_clicks(USERNAME, PASSWORD);
}


async function sorting_suite(){
    await TC_15_Valid_Sorting_Functionality_In_Product_Page_Sort_By_Low_To_High(USERNAME, PASSWORD);
}

//---------------------------------- End of Suites ----------------------------------





//---------------------------------- Run All Suites ----------------------------------
(async function runAllSuites(){
    await login_suite();
    await addToCart_suite();
    await sorting_suite();
    printTestCases(testCaseMessages, "Test Suites (Error User)");
})()

//---------------------------------- End of Run All Suites ----------------------------------







