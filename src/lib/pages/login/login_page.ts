import BasePage from "../base_page";
import Data from '../../../constants';
import Element from "../../elements/base_element";
import { By, ThenableWebDriver } from "selenium-webdriver";
import { log } from "../../decorators/logger_decorator";

const { common: {inputByType: input}, loginPage: { personalAccount, errorElement }} = Data.pageLocators;

export default class LoginPage extends BasePage {

  constructor(driver: ThenableWebDriver) {
    super(driver);
  }

  @log
  async inputByType(type: string): Promise<Element> {
    return await this.find(By.xpath(input(type)));
  }

  @log
  async accountElement(): Promise<Element> {
    return await this.find(By.xpath(personalAccount));
  }

  @log
  async errorElement(error: string): Promise<Element> {
    return await this.find(By.xpath(errorElement(error)));
  }
}