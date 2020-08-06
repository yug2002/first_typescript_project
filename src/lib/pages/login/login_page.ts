import BasePage from "../base_page";
import Data from '../../../constants';
import Element from "../../elements/base_element";
import { By, ThenableWebDriver } from "selenium-webdriver";

const { common: {inputByType: input}, loginPage: { personalAccount, errorElement }} = Data.pageLocators;

export default class LoginPage extends BasePage {

  constructor(driver: ThenableWebDriver) {
    super(driver);
  }
  async inputByType(type: string): Promise<Element> {
    return await this.find(By.xpath(input(type)));
  }

  async accountElement(): Promise<Element> {
    return await this.find(By.xpath(personalAccount));
  }
}