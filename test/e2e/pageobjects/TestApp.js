import assert from 'assert';
import toQueryString from '../util/toQueryString';

/* eslint-disable max-len */
class TestApp {
  get rootSelector() { return $('#root'); }
  get readySelector() { return $('#root.rendered.loaded'); }
  get landingSelector() { return $('body.oidc-app.landing'); }

  // Authenticated landing
  get logoutRedirectBtn() { return $('#logout-redirect'); }
  get logoutXHRBtn() { return $('#logout-xhr'); }
  get logoutAppBtn() { return $('#logout-app'); }
  get renewTokenBtn() { return $('#renew-token'); }
  get revokeTokenBtn() { return $('#revoke-token'); }
  get revokeRefreshTokenBtn() { return $('#revoke-refresh-token'); }
  get getTokenBtn() { return $('#get-token'); }
  get clearTokensBtn() { return $('#clear-tokens'); }
  get getUserInfoBtn() { return $('#get-userinfo'); }
  get userInfo() { return $('#user-info'); }
  get sessionExpired() { return $('#session-expired'); }
  get testConcurrentGetTokenBtn() { return $('#test-concurrent-get-token'); }

  get tokenError() { return $('#token-error'); }
  get tokenMsg() { return $('#token-msg'); }
  
  // Unauthenticated landing
  get loginWidgetBtn() { return $('#login-widget'); }
  get loginRedirectBtn() { return $('#login-redirect'); }
  get loginPopupBtn() { return $('#login-popup'); }
  get loginDirectBtn() { return $('#login-direct'); }
  get username() { return $('#username'); }
  get password() { return $('#password'); }
  get testConcurrentLoginBtn() { return $('#test-concurrent-login'); }

  // Form
  get responseModeQuery() { return $('#f_responseMode [value="query"]'); }
  get responseModeFragment() { return $('#f_responseMode [value="fragment"]'); }
  get pkceOption() { return $('#f_pkce-on'); }
  get clientId() { return $('#f_clientId'); }
  get issuer() { return $('#f_issuer'); }
  get interactionCodeOption() { return $('#f_useInteractionCodeFlow-on'); }

  // Callback
  get callbackSelector() { return $('#root.rendered.loaded.callback'); }
  get callbackHandledSelector() { return $('#root.callback-handled'); }

  // Toolbar
  get subscribeAuthStateBtn() { return $('#subscribe-auth-state'); }
  get subscribeTokenEventsBtn() { return $('#subscribe-token-events'); }
  get startServiceBtn() { return $('#start-service'); }
  get handleCallbackBtn() { return $('#handle-callback'); }
  get callbackResult() { return $('#callback-result'); }
  get returnHomeBtn() { return $('#return-home'); }
  get accessToken() { return $('#access-token'); }
  get idToken() { return $('#id-token'); }
  get refreshToken() { return $('#refresh-token'); }
  get success() { return $('#success'); }
  get error() { return $('#error'); }
  get xhrError() { return $('#xhr-error'); }

  // Widget
  get signinWidget() { return $('#widget .primary-auth'); }
  
  async open(queryObj) {
    await browser.url(toQueryString(queryObj));
    await browser.waitUntil(async () => this.readySelector.then(el => el.isExisting()), 5000, 'wait for ready selector');
  }

  async showLoginWidget() {
    await this.waitForLoginBtn();
    await this.loginWidgetBtn.then(el => el.click());
  }

  async loginRedirect() {
    await this.waitForLoginBtn();
    await this.loginRedirectBtn.then(el => el.click());
  }

  async handleCallback() {
    await this.waitForCallback();
    await browser.waitUntil(async () => this.handleCallbackBtn.then(el => el.isDisplayed()), 5000, 'wait for handle callback btn');
    await this.handleCallbackBtn.then(el => el.click());
  }

  async loginPopup() {
    await this.waitForLoginBtn();
    var btn = await this.loginPopupBtn;
    await btn.click();
  }

  async loginDirect() {
    await this.waitForLoginBtn();
    await this.loginDirectBtn.then(el => el.click());
  }

  async renewToken() {
    const btn = await this.renewTokenBtn;
    await btn.click();
  }

  async getToken() {
    return this.getTokenBtn.then(el => el.click());
  }

  async clearTokens() {
    return this.clearTokensBtn.then(el => el.click());
  }

  async revokeToken() {
    return this.revokeTokenBtn.then(el => el.click());
  }

  async revokeRefreshToken() {
    return this.revokeRefreshTokenBtn.then(el => el.click());
  }

  async getUserInfo() {
    await browser.waitUntil(async () => this.getUserInfoBtn.then(el => {
      // Was facing an issue where click would not work without using browser.pause to add a delay
      // Clicking directly in javascript solves the issue.
      // It may be related to webdriver logic which is to scroll to the element.
      if (el.isDisplayed()) {
        browser.execute('arguments[0].click();', el);
        return true;
      }
    }), 5000, 'wait for get user info btn');
  }

  async returnHome() {
    await browser.waitUntil(async () => this.returnHomeBtn.then(el => el.isDisplayed()));
    await this.returnHomeBtn.then(el => el.click());
    await browser.waitUntil(async () => this.landingSelector.then(el => el.isDisplayed()));
    await browser.waitUntil(async () => this.readySelector.then(el => el.isExisting()), 5000, 'wait for ready selector');
  }

  async logoutRedirect() {
    await this.logoutRedirectBtn.then(el => el.click());
    await this.waitForLoginBtn();
  }

  async logoutXHR() {
    await this.logoutXHRBtn.then(el => el.click());
    await this.waitForLoginBtn();
  }

  async logoutApp() {
    await this.logoutAppBtn.then(el => el.click());
    await this.waitForLoginBtn();
  }

  async startService() {
    await this.startServiceBtn.then(el => el.click());
  }
  
  async subscribeToAuthState() {
    await this.subscribeAuthStateBtn.then(el => el.click());
  }

  async subscribeToTokenEvents() {
    await this.subscribeTokenEventsBtn.then(el => el.click());
  }

  async testConcurrentLogin() {
    await this.testConcurrentLoginBtn.then(el => el.click());
  }

  async testConcurrentGetToken() {
    await this.testConcurrentGetTokenBtn.then(el => el.click());
  }

  async waitForLoginBtn() {
    return browser.waitUntil(async () => this.loginRedirectBtn.then(el => el.isDisplayed()), 5000, 'wait for login button');
  }

  async waitForLogoutBtn() {
    return browser.waitUntil(async () => this.logoutRedirectBtn.then(el => el.isDisplayed()), 15000, 'wait for logout button');
  }

  async waitForCallback() {
    return browser.waitUntil(async () => this.callbackSelector.then(el => el.isExisting()), 5000, 'wait for callback');
  }

  async waitForCallbackResult() {
    return browser.waitUntil(async () => this.callbackHandledSelector.then(el => el.isExisting()), 5000, 'wait for callback result');
  }

  async waitForUserInfo() {
    return browser.waitUntil(async () => this.userInfo.then(el => el.isDisplayed()), 5000, 'wait for user info');
  }

  async waitForSigninWidget() {
    return browser.waitUntil(async () => this.signinWidget.then(el => el.isDisplayed()), 5000, 'wait for signin widget');
  }

  async assertCallbackSuccess() {
    await this.waitForCallbackResult();
    await this.success.then(el => el.getText()).then(txt => {
      assert(txt !== '');
    });
    await this.error.then(el => el.getText()).then(txt => {
      assert(txt === '');
    });
    await this.xhrError.then(el => el.getText()).then(txt => {
      assert(txt === '');
    });
    await this.accessToken.then(el => el.getText()).then(txt => {
      assert(txt.indexOf('expiresAt') > 0);
    });
    await this.idToken.then(el => el.getText()).then(txt => {
      assert(txt.indexOf('claims') > 0);
    });
  }

  async assertLoggedIn() {
    await this.waitForLogoutBtn();
    await this.accessToken.then(btn => btn.getText()).then(txt => {
      assert(txt.indexOf('expiresAt') > 0);
    });
    await this.idToken.then(btn => btn.getText()).then(txt => {
      assert(txt.indexOf('claims') > 0);
    });
  }

  async assertLoggedOut() {
    await this.waitForLoginBtn();
  }

  async assertUserInfo() {
    await this.waitForUserInfo();
    await this.userInfo.then(el => el.getText()).then(txt => {
      assert(txt.indexOf('email') > 0);
    });
  }

  async assertIdToken() {
    await this.idToken.then(el => el.getText()).then(txt => {
      assert(txt.indexOf('claims') > 0);
    });
  }

  async assertTokenMessage(msg) {
    await browser.waitUntil(async () => {
      const txt = await this.tokenMsg.then(el => el.getText());
      return txt !== '';
    }, 10000, 'wait for token message');
    const txt = await this.tokenMsg.then(el => el.getText());
    assert(txt === msg);
  }

}

export default new TestApp();
