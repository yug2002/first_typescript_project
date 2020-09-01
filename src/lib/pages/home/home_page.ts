import BasePage from '../base_page';
import Data from '../../../constants'
import Element from '../../elements/base_element';
import { By, ThenableWebDriver } from 'selenium-webdriver';
import { log } from '../../decorators/logger_decorator';

const { homePage: {title}, common: { buttonByName: button } } = Data.pageLocators;

export default class HomePage extends BasePage {
  constructor(driver: ThenableWebDriver) {
    super(driver);
  }

  async open(): Promise<void> {
    return await super.open(Data.applicationUrl);
  }

  @log
  async title(): Promise<Element> {
    return await this.find(By.xpath(title));
  }

  @log
  async buttonByName(name:string): Promise<Element> {
    return await this.find(By.xpath(button(name)));
  }
}