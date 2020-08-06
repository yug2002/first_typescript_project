import HomePage from '../pages/home/home_page';
import { ThenableWebDriver } from 'selenium-webdriver';

export const getPage = (page: string, driver: ThenableWebDriver) => {
  switch(page.toLowerCase()) {
    case 'home': return new HomePage(driver);
    break;
    // case 'login': return new LoginPage(browser);
    // break;
    // case 'todo': return new TodoPage(browser);
    // break;
    default: throw new Error('No any page found');
  };
}