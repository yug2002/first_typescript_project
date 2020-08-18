import Browser from '../lib/browser';
import { getPage as pages } from '../lib/pages/page_factory';
import HomePage from '../lib/pages/home/home_page';
import { expect } from 'chai';
import LoginPage from '../lib/pages/login/login_page';
import data from '../constants';
import TodoPage from '../lib/pages/todo/todo_page';
import * as helpers from '../utils/helpers';
import Log from '../lib/logger/log';

const { login, password } = data;
const getString = helpers.generatedString;

describe('check home page', () => {
  let home: HomePage;
  let browser: Browser;
  describe('positive scenarios for home page', () => {

    beforeEach(async () => {
      Log.debug(data.currentBrowser + ' start');
      browser = Browser.getInstance();
      await browser.start();
      home = pages('Home', browser.currDriver) as HomePage;
      await home.open();
    })

    afterEach(async function() {
      try{
        if(this.currentTest.state === 'failed') {
          const title:string =  this.currentTest.title;
          await browser.takeScreenshot(`screenShot ${title}${Date.now()}.png`);
        }
      } catch(e) {
        Log.error(e);
      } finally {
        Log.debug(data.currentBrowser + ' stop');
        await browser.stop();
      }
    })

    it('check that home page is opened', async () => {
      const title = await home.title();
      expect(await title.getText()).to.be.equal('Microsoft To Do');
    });

    it('check that user can login', async () => {
      const getStartedButton = await home.buttonByName('Get started');
      await getStartedButton.click();
      const loginPage = pages('Login', browser.currDriver) as LoginPage;
      const emailInput = await loginPage.inputByType('email');
      await emailInput.type(login);
      let submit = await loginPage.inputByType('submit');
      await submit.click();
      const account = await loginPage.accountElement();
      await account.click();
      const passwordInput = await loginPage.inputByType('password');
      await passwordInput.type(password);
      submit = await loginPage.inputByType('submit');
      await submit.click();
      const todoPage = pages('todo', browser.currDriver) as TodoPage;
      const title = await todoPage.pageTitle();
      expect(await title.getText()).to.be.equal('To Do');
    });
  })

  const tests = [{log: getString(13)}, { log: getString(10)}, { log: getString(10)}];

  tests.forEach(run => {
    describe('negative scenarios for home page', () => {
      beforeEach(async () => {
        Log.debug(data.currentBrowser + ' start');
        browser = Browser.getInstance();
        await browser.start();
        home = pages('Home', browser.currDriver) as HomePage;
        await home.open();
      })

      afterEach(async function() {
        if(this.currentTest.state === 'failed') {
          const title:string =  this.currentTest.title;
          await browser.takeScreenshot(`screenShot ${title}${Date.now()}.png`);
        }
        Log.debug(data.currentBrowser + ' stop');
        await browser.stop();
      })

      it('check negative login scenarios', async () => {
        const button = await home.buttonByName('Get started');
        await button.click();
        const loginPage = pages('login', browser.currDriver) as LoginPage;
        const emailInput = await loginPage.inputByType('email');
        await emailInput.type(run.log);
        const submit = await loginPage.inputByType('submit');
        await submit.click();
        const error = await loginPage.errorElement('username');
        expect(await error.isDisplayed()).to.be.equal(true);
      });
    })
  })
})
