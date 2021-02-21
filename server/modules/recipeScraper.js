const puppeteer = require('puppeteer');
//Recipe scraper uses the Puppeteer library to create a headless browser which collects meta data from
//the selected website and returns that information.
async function scraper(url) {
    //opens the headless browser
    const browser = await puppeteer.launch();
    //makes the browser incognito
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    //dispatches browser to the url entered by the user on the gui.
    await page.goto(url);
    //selects the element that contains the recipes information which always has the type="application/ld+json" tag
    //This tag is used by Google to display the recipe cards when a person searches for a recipe.
    const element = await page.$('script[type="application/ld+json"]');
    //stores the information in the ld+json tag as a variable named "text"
    const text = await page.evaluate((element) => element.innerText, element);
    const JSONparsedText = JSON.parse(text);
    console.log(JSONparsedText);
    //closes headless browser
    await browser.close();
    //returns parsed JSON recipe
    return JSONparsedText;
}

module.exports = scraper;
