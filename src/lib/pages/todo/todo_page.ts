import BasePage from "../base_page";
import Data from '../../../constants';
import { By } from "selenium-webdriver";
import { log } from "../../decorators/logger_decorator";

const { todoPage: { title }} = Data.pageLocators;

export default class TodoPage extends BasePage {

  @log
  async pageTitle() {
    return await this.find(By.xpath(title));
  }
}