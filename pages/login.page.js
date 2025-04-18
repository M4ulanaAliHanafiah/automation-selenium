const { By } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.saucedemo.com/';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async login(username, password) {
    await this.driver.findElement(By.id('user-name')).sendKeys(username);
    await this.driver.findElement(By.id('password')).sendKeys(password);
    await this.driver.findElement(By.id('login-button')).click();

    // Delay 60 detik
    await this.driver.sleep(10000);
  }

  async getFirstProductName() {
    const productElement = await this.driver.findElement(By.className('inventory_item_name'));
    return await productElement.getText();
  }

  async isInventoryPage() {
    const currentUrl = await this.driver.getCurrentUrl();
    return currentUrl.includes('inventory');
  }
}

module.exports = LoginPage;
