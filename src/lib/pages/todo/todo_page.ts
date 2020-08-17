import BasePage from "../base_page";
import Data from '../../../constants';
import { By } from "selenium-webdriver";

const { todoPage: { title }} = Data.pageLocators;

export default class TodoPage extends BasePage {

  async pageTitle() {
    return await this.find(By.xpath(title));
  }
}