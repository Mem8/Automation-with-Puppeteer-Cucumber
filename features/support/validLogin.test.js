const { When, Then, Given, Before, AfterAll, After } = require("cucumber")
const browserObject = require("../../browserConfiguration");
var { setDefaultTimeout } = require('cucumber');
const { WebSelectors } = require('../../utility/WebSelectors');
const { expect } = require("chai");

setDefaultTimeout(60000);
let browser, page;
Before(async function () {
    browser = await browserObject.startBrowser();
    page = await browser.newPage();
})
Given("User login with valid account", async function () {
    await page.goto("http://automationpractice.com")
})

When('User enters valid {string} and {string}', async function (username, password) {
    await page.waitForSelector(WebSelectors.loginButtonSelector);
    let loginButton = await page.$(WebSelectors.loginButtonSelector);
    await loginButton.click();
    await page.waitForNavigation();

    await page.type(WebSelectors.emailSelector, username);
    await page.type(WebSelectors.passwordSelector, password);

    await page.click(WebSelectors.submitButtonSelector);

});

Then('User can logged in successfully', async function () {
    await page.waitForSelector(WebSelectors.logoutButtonSelector);
    let logoutButton = await page.$(WebSelectors.logoutButtonSelector);

    expect(logoutButton != null).equals(true);
    await logoutButton.click();

});


After(async () => {
    await browser.close();
});