import Browser from '../lib/browser'
import { getPage as pages } from '../lib/pages/page_factory'
import HomePage from '../lib/pages/home/home_page';
import { expect } from 'chai';
import LoginPage from '../lib/pages/login/login_page';
import data from '../constants';
import TodoPage from '../lib/pages/todo/todo_page';

const { login, password } = data;

describe('check home page', () => {
  let home: HomePage;

  beforeEach(async () => {
    // browser = Browser.getInstance();
    await Browser.getInstance().start();
    home = pages('Home', Browser.getInstance().currDriver) as HomePage;
    await home.open();
  })

  afterEach(async () => {
    if(Browser.getInstance().currDriver) {
      await Browser.getInstance().close();
    }
  })

  it('check that home page is opened', async () => {
    const title = await home.title();
    expect(await title.getText()).to.be.equal('Microsoft To Do');
  });

  it('check that user can login', async () => {
    const getStartedButton = await home.buttonByName('Get started');
    await getStartedButton.click();
    const loginPage = pages('Login', Browser.getInstance().currDriver) as LoginPage;
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
    const todoPage = pages('todo', Browser.getInstance().currDriver) as TodoPage;
    const title = await todoPage.pageTitle();
    expect(await title.getText()).to.be.equal('To Do');
  })
})