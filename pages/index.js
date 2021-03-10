const dotenv = require('dotenv');
import AmazonLoginPage from '../pages/AmazonLoginPage'
import TestBase from "../tests/TestBase"
dotenv.config();

(async() => {
  let test = new TestBase()
  let page = await test.createPage()
  let amazonLogin = new AmazonLoginPage(page)

  await amazonLogin.open()
  await amazonLogin.setUsername("9654081639")
  await amazonLogin.clickToContinue()

  await amazonLogin.setPassword(process.env.SECRET_KEY)
  await amazonLogin.clickToSignIn()

  await amazonLogin.takeScreenShot()
  await test.cleanup()
})();