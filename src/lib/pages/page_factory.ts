import HomePage from '../pages/home/home_page';
import { ThenableWebDriver } from 'selenium-webdriver';
import LoginPage from './login/login_page';
import TodoPage from './todo/todo_page';

export const getPage = (page: string, driver: ThenableWebDriver) => {
  switch(page.toLowerCase()) {
    case 'home': return new HomePage(driver);
    break;
    case 'login': return new LoginPage(driver);
    break;
    case 'todo': return new TodoPage(driver);
    break;
    default: throw new Error('No any page found');
  };
}