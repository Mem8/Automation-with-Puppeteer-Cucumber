const puppeteer = require('puppeteer');
async function startBrowser() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            devtools: false,
            slowMo:1,
            args: [
                '--start-maximized',
                '--window-size=1920,1080'
            ],
            defaultViewport: {
                width:1920,
                height:1080
              }
        });
    } 
    catch (err) {
        console.log("Browser cannot be created => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};