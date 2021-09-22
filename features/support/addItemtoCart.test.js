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
Given("User access to site for buying something", async function () {
    await page.goto("http://automationpractice.com")
})

When('User enters category and item name {string} and {string} and {string}', async function (category,item,bulk) {
    await page.waitForSelector(WebSelectors.loginButtonSelector);

    if(category == "Women"){
        const aElementsCategoryW = await page.$x("//a[contains(text(), 'Women')]");
        await aElementsCategoryW[0].click();
    }
    else if(category == "Dresses"){
        const aElementsCategoryD = await page.$x("//a[contains(text(), 'Dresses')]");
        await aElementsCategoryD[0].click();
    }
    else{
        const aElementsCategoryT = await page.$x("//a[contains(text(), 'T-shirt')]");
        await aElementsCategoryT[0].click();
    }
    

    await page.waitForSelector(WebSelectors.loginButtonSelector);

    if(item == "Chiffon"){
        const aElementsItemC = await page.$x("//a[contains(text(), 'Printed Chiffon Dress')]");
        await aElementsItemC[0].click();
    }
    else{
        const aElementsItemF = await page.$x("//a[contains(text(), 'Faded Short Sleeve T-shirts')]");
        await aElementsItemF[0].click();
    }

    

    await page.waitForSelector(WebSelectors.loginButtonSelector);   
    await page.type(WebSelectors.quantitySelector,bulk);

    await page.click(WebSelectors.submitCartButton);

    
});

Then('User add item', async function () {
    await page.waitFor(10000);

    const aElementsCheckout = await page.$x("//a[contains(title(), 'Proceed to checkout')]");

    expect(aElementsCheckout != null).equals(true);
    await aElementsCheckout.click();

});


After(async () => {
    await browser.close();
});