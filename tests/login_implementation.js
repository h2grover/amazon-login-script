"use strict";

var assert = require("assert");
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const getActualUrl = async (user) =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let actualUrl = "";

    await page.goto('https://www.amazon.in/ap/signin?ie=UTF8&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2Fyour-account%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&switch_account=signin&ignoreAuthState=1&disableLoginPrepopulate=1&ref_=ap_sw_aa');
    
    await page.type("#ap_email", user)
  
    await Promise.all([
      page.waitForNavigation(),
      await page.click("#continue")
    ])
  
    await page.type("#ap_password", process.env.SECRET_KEY)
  
    await Promise.all([
      page.waitForNavigation(),
      await page.click("#signInSubmit")
    ])
     
    actualUrl = await page.url();
  
    await page.screenshot({ path: 'example.png' });
  
    await browser.close();
    
    return actualUrl
}
// --------------------------
// Gauge step implementations
// --------------------------

step("Open the amazon account of <user>",async function(user){
  let expectedUrl = "https://www.amazon.in/your-account?ref_=nav_signin&";
  let actualUrl = await getActualUrl(user);

  assert.strictEqual(expectedUrl, actualUrl);
})

