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
Given("User visits for creating account", async function () {
    await page.goto("http://automationpractice.com")
})

When('User {string} and {string} and {string} and {string} and {string} and {string} and {string} and {string} and {string} and {string} and {string} and {string} and {string} and {string}', async function (username,password,firstname,lastname,gender,dateofbirth_day,dateofbirth_month,dateofbirth_years,address,state,zipcode,phone,alias,city) {
    await page.waitForSelector(WebSelectors.loginButtonSelector);
    let loginButton = await page.$(WebSelectors.loginButtonSelector);
    await loginButton.click();
    await page.waitForNavigation();

    await page.type(WebSelectors.emailCreateSelector, username);
    await page.click(WebSelectors.submitCreateButtonSelector);

    await page.waitForSelector(WebSelectors.gender1Selector);
    if(gender=="M")
        await page.click(WebSelectors.gender1Selector);
    else
        await page.click(WebSelectors.gender2Selector);
    
    await page.type(WebSelectors.customerFirstnameSelector,firstname);
    await page.type(WebSelectors.customerLastnameSelector,lastname);

    await page.type(WebSelectors.passwordSelector,password);

    await page.select(WebSelectors.dateofbirthDaySelector, dateofbirth_day);
    await page.select(WebSelectors.dateofbirthMonthSelector, dateofbirth_month);
    await page.select(WebSelectors.dateofbirthYearSelector, dateofbirth_years);

    await page.type(WebSelectors.companySelector,"Company");
    await page.type(WebSelectors.addressSelector,address);
    await page.type(WebSelectors.citySelector,city);
    await page.select(WebSelectors.stateSelector,state);
    await page.type(WebSelectors.postCodeSelector,zipcode);
    await page.type(WebSelectors.phoneMobileSelector,phone);
    await page.type(WebSelectors.phoneSelector,"3333333333");
    await page.type(WebSelectors.aliasSelector,alias);

    await page.click(WebSelectors.submitAccountSelector);
    
});

Then('User Created successfully', async function () {
    await page.waitForSelector(WebSelectors.logoutButtonSelector);
    let logoutButton = await page.$(WebSelectors.logoutButtonSelector);

    expect(logoutButton != null).equals(true);
    await logoutButton.click();

});


After(async () => {
    await browser.close();
});