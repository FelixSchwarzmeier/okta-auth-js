import assert from 'assert';
import TestApp from '../pageobjects/TestApp';
import OktaLogin from '../pageobjects/OktaLogin';
import { switchToPopupWindow, switchToLastFocusedWindow } from './browserUtils';

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const FB_USERNAME = process.env.FB_USERNAME;
const FB_PASSWORD = process.env.FB_PASSWORD;

function assertPKCE(url, responseMode) {
  const char = responseMode === 'fragment' ? '#' : '?';
  const str = url.split(char)[1];
  assert(str.indexOf('code' > 0));
}

function assertImplicit(url, responseMode) {
  const char = responseMode === 'query' ? '?' : '#';
  const str = url.split(char)[1];
  assert(str.indexOf('id_token' > 0));
}

async function handleCallback(flow, responseMode) {
  await TestApp.waitForCallback();
  const url = await browser.getUrl();
  (flow === 'pkce') ? assertPKCE(url, responseMode) : assertImplicit(url, responseMode);
  await TestApp.handleCallback();
  await TestApp.assertCallbackSuccess();
  await TestApp.returnHome();
  return url;
}

async function loginPopup() {
  const existingHandlesCount = (await browser.getWindowHandles()).length;
  await TestApp.loginPopup();
  await switchToPopupWindow(existingHandlesCount);

  if (process.env.ORG_OIE_ENABLED) {
    await OktaLogin.signinOIE(USERNAME, PASSWORD);
  } else {
    await OktaLogin.signinLegacy(USERNAME, PASSWORD);
  }

  await switchToLastFocusedWindow();
  await TestApp.assertLoggedIn();
}

async function loginRedirect(flow, responseMode) {
  await TestApp.loginRedirect();
  await OktaLogin.signin(USERNAME, PASSWORD);
  return handleCallback(flow, responseMode);
}

async function loginDirect(flow) {
  await TestApp.username.then(el => el.setValue(USERNAME));
  await TestApp.password.then(el => el.setValue(PASSWORD));
  await TestApp.loginDirect();
  return handleCallback(flow);
}

async function loginWidget(flow, forceRedirect=false) {
  await TestApp.showLoginWidget();

  // OIE widget is only displayed for direct auth with PKCE even with OIE enabled orgs
  // For direct auth implicit flow, we still use the v1 flow (since interaction code doesn't)
  if (flow === 'implicit' || !process.env.ORG_OIE_ENABLED) {
    await OktaLogin.signinLegacy(USERNAME, PASSWORD);   
  } else {
    await OktaLogin.signinOIE(USERNAME, PASSWORD);
  }
  
  if (forceRedirect) {
    return handleCallback(flow);
  }
  await TestApp.assertLoggedIn();
}

async function loginWidgetFacebook(flow, forceRedirect) {
  await TestApp.loginRedirect();
  await OktaLogin.signinFacebook(FB_USERNAME, FB_PASSWORD);

  if (forceRedirect) {
    return handleCallback(flow);
  }
  await TestApp.assertLoggedIn();
}

export { loginWidget, loginDirect, loginPopup, loginRedirect, loginWidgetFacebook };
