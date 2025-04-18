const { Builder, By, until } = require('selenium-webdriver');
const LoginPage = require('../pages/login.page');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('SauceDemo Login Test', function () {
  this.timeout(70000);

  let driver;
  let loginPage;

  before(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options())
      .build();
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      const screenshot = await driver.takeScreenshot();
      const filePath = path.resolve(`./screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png`);
      fs.writeFileSync(filePath, screenshot, 'base64');
      console.log(`📸 Screenshot saved at: ${filePath}`);
    }
  });

  it('should login and see the first product card', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    const onInventoryPage = await loginPage.isInventoryPage();
    assert.strictEqual(onInventoryPage, true, 'mengecek data setelah login');

    const productName = await loginPage.getFirstProductName();
    assert.ok(productName.length > 0, 'data pertama muncul jika tidak kosong');
    console.log('✔ Data Pertama:', productName);
  });
});
