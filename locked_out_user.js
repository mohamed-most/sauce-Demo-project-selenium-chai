import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';  
import { setUp, login, printTestCases, saveScreenshot } from './utils.js';


const LOCKED_OUT_USERNAME = 'locked_out_user';
const LOCKED_OUT_PASSWORD = 'secret_sauce';
const TIMEOUT_WAIT_TO_SEE_RESULT = 1000;

let testCaseMessages = [];

/**
 * Save screenshot to the "screenshots" folder
 * @param {WebDriver} driver
 * @param {string} testName
 */



/**
 * Test Case 07: Locked Out User Login With Valid Credentials
 */
async function Tc_07_Locked_Out_User_Login_With_Valid_Credentials(username, password) {
    let driver;
    try {
        driver = await setUp();
        await login(driver, username, password);

        const errorElement = await driver.wait(until.elementLocated(By.xpath("//h3[@data-test='error']")), 10000);
        const errorMessage = await errorElement.getText();

        expect(errorMessage).to.not.equal.a("string").contain("Error");
        testCaseMessages.push(`Test Case 07: Locked Out User Login With Valid Credentials Passed`);
    } catch (error) {
        testCaseMessages.push(`Test Case 07: Locked Out User Login With Valid Credentials Failed`);
        if (driver) await saveScreenshot(driver, "TC_07_LockedOutLogin");
    } finally {
        driver.sleep(TIMEOUT_WAIT_TO_SEE_RESULT);
        if (driver) await driver.quit();
    }
}


/**
 * Locked Out User Suite
 */
async function locked_out_user_suite() {
    await Tc_07_Locked_Out_User_Login_With_Valid_Credentials(LOCKED_OUT_USERNAME, LOCKED_OUT_PASSWORD);
}


/**
 * Run All Suites
 */
(async function runAllSuites() {
    await locked_out_user_suite();
    printTestCases(testCaseMessages, "Locked Out User");
})();
