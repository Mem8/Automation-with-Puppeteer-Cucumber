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

Given("User login with invalid account", async function () {
    await page.goto("http://automationpractice.com")
})
When('User enters invalid {string} and {string}', async function (username, password) {
    await page.waitForSelector(WebSelectors.loginButtonSelector);
    let loginButton = await page.$(WebSelectors.loginButtonSelector);
    await loginButton.click();
    await page.waitForNavigation();

    await page.type(WebSelectors.emailSelector, username);
    await page.type(WebSelectors.passwordSelector, password);

    await page.click(WebSelectors.submitButtonSelector);

});
Then('User gets error message', async function () {
    await page.waitForXPath(WebSelectors.errorXPath);
    let [errorElement] = await page.$x(WebSelectors.errorXPath);
    let errorText = await page.evaluate(e => e.textContent, errorElement);
    console.log(errorText);
    expect(errorText).includes('There is 1 error')

});

After(async () => {
    await browser.close();
});