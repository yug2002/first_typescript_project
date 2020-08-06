import BasePage from "../base_page";
import Data from '../../../constants';
import Element from "../../elements/base_element";
import { By, ThenableWebDriver } from "selenium-webdriver";
const { todoPage: { title }} = Data.pageLocators;

export default class TodoPage extends BasePage {

  async pageTitle() {
    return await this.find(By.xpath(title));
  }
}