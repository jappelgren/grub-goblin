const puppeteer = require('puppeteer');

async function scraper(url) {
    const browser = await puppeteer.launch();
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url);
    const element = await page.$('script[type="application/ld+json"]');
    const text = await page.evaluate((element) => element.innerText, element);
    const JSONparsedText = JSON.parse(text);
    console.log(JSONparsedText)
    return JSONparsedText;
}

module.exports = scraper;
