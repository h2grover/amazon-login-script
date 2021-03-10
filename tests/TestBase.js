const puppeteer = require('puppeteer');

module.exports = class TestBase {
  constructor(){
    this.browser = ""
  }
  async createPage(){
    const browser = await puppeteer.launch();
    this.browser = browser
    const page = await browser.newPage();
    return page
  }  
  async cleanup(){
    await this.browser.close();
  }
}

// module.exports.TestBase = TestBase