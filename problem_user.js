import { By, Browser, Key, Builder, until } from 'selenium-webdriver';
import { expect } from 'chai';  
import { printTestCases, setUp, login, addToCart, clickOnCart, checkout, fillInInformation, clickContinue, finishCheckout, saveScreenshot } from './utils.js';



//Global constants
const PROBLEM_USER_USERNAME = 'problem_user';
const PROBLEM_USER_PASSWORD = 'secret_sauce';
const FIRST_NAME = 'John';
const LAST_NAME = 'Doe';
const POSTAL_CODE = '12345';
const TIMEOUT_WAIT_TO_SEE_RESULT = 1000;


//array of messages of the test cases

let testCaseMessages = [];


async function Tc_08_valid_checkout(username,password,firstName,lastName,postalCode,numberOfItems){
    let driver;
    try{
        // 1. Set up the driver
        driver = await setUp();

        // 2. Login with valid credentials
        await login(driver,username,password);

        // 3. Add to Cart
        await addToCart(driver,numberOfItems);

        // 4. Click on Cart
        await clickOnCart(driver);

        // 5. Checkout
        await checkout(driver);

        // 6. Fill in the information
        await fillInInformation(driver,firstName,lastName,postalCode);

        // 7. Click continue
        await clickContinue(driver);



        // 8. Checkout complete
        let checkoutComplete = await driver.wait(until.elementLocated(By.xpath("//h3[@data-test='error']")), 10000);
        let checkoutCompleteText = await checkoutComplete.getText();

        expect(checkoutCompleteText).to.not.equal.a("string").contain("Error");
        testCaseMessages.push(`Test Case 08: Entering User Data in form Passed`);
        
       
    }
    catch(error){
        testCaseMessages.push(`Test Case 08: Entering User Data in form Failed`);
        await saveScreenshot(driver, 'TC_08_Entering_User_Data_In_Form_Failed');
    }
    finally{
        driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);
        await driver.quit();
    }
}

async function Tc_09_valid_Remove_Product_From_Cart_In_Product_Page(username, password, numberOfItems) {
    let driver;
    try {
        driver = await setUp();
        await login(driver, username, password);

        // Wait until product buttons are loaded
        let addToCartButtons = await driver.wait(
            until.elementsLocated(By.xpath("//button[contains(@class, 'btn_inventory')]")),
            10000
        );

        // Limit the number of items to the available buttons length
        const itemsToTest = Math.min(numberOfItems, addToCartButtons.length);

        for (let i = 0; i < itemsToTest; i++) {
            let button = addToCartButtons[i];

            let buttonText = await button.getText();

            if (buttonText === "Add to cart") {
                await button.click();
                buttonText = await button.getText();
                expect(buttonText).to.equal("Remove");
            } else if (buttonText === "Remove") {
                await button.click();
                buttonText = await button.getText();
                expect(buttonText).to.equal("Add to cart");
            } else {
                throw new Error(`Unexpected button text on item ${i + 1}: ${buttonText}`);
            }
        }

        testCaseMessages.push(`Test Case 09: Removing Product From Cart In Product Page Passed`);

    } catch (error) {
        testCaseMessages.push(`Test Case 09: Removing Product From Cart In Product Page Failed`);
        await saveScreenshot(driver, 'TC_09_Removing_Product_From_Cart_In_Product_Page');
    } finally {
        if (driver) {
            await driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);
            await driver.quit();
        }
    }
}





async function problem_user_form_suite(){
    await Tc_08_valid_checkout(PROBLEM_USER_USERNAME, PROBLEM_USER_PASSWORD, FIRST_NAME, LAST_NAME, POSTAL_CODE, 6);
}



async function problem_user_remove_product_from_cart_in_product_page_suite(){
    await Tc_09_valid_Remove_Product_From_Cart_In_Product_Page(PROBLEM_USER_USERNAME, PROBLEM_USER_PASSWORD, 1);
}





(async function runAllSuites(){
    await problem_user_form_suite();
    await problem_user_remove_product_from_cart_in_product_page_suite();
    printTestCases(testCaseMessages, "Problem User");
})()
