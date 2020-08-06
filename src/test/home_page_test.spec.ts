import Browser from '../lib/browser'
import { getPage as factory } from '../lib/pages/page_factory'
import HomePage from '../lib/pages/home/home_page';
import {ThenableWebDriver}  from 'selenium-webdriver';
import { expect } from 'chai';
import { doesNotMatch } from 'assert';

describe('check home page', () => {

  let home: HomePage;
  let driver: ThenableWebDriver;

  beforeEach(async () => {
    driver = Browser.getInstance().wrappedDriver;
    home = factory('Home', driver);
    await home.open();    
  })

  afterEach(async () => {
    await Browser.getInstance().close();
  })

  it('check that home page is opened', async () => {
    const title = await home.title();
    expect(await title.getText()).to.be.equal('Microsoft To Do');    
  });
})