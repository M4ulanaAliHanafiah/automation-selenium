const BasePage = require('./base.page');

class LoginPage extends BasePage {
  get usernameInput() { return $('#user-name'); }
  get passwordInput() { return $('#password'); }
  get loginButton() { return $('#login-button'); }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new LoginPage();
