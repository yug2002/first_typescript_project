import IFind from '../interfaces/i_find';
import Element from '../elements/base_element'
import { By, ThenableWebDriver, until } from 'selenium-webdriver';
import * as wait from '../../utils/wait';
import { Predicate } from '../interfaces/i_predicate';
import { log } from '../decorators/logger_decorator';

export default abstract class BasePage implements IFind {
  private _driver: ThenableWebDriver;
  private  predicate: Predicate;

  constructor(driver: ThenableWebDriver) {
    this._driver = driver;
  }

  @log
  async find(by: By): Promise<Element> {   
    this.predicate = (async () => (await (await this._driver).findElements(by)).length > 0);
    await wait.waitFor(this.predicate);
    return new Element((await this._driver).findElement(by));
  }

  @log
  async findAll(by: By): Promise<Element[]> {   
    this.predicate = (async () => (await (await this._driver).findElements(by)).length > 0);
    await wait.waitFor(this.predicate);
    const collection = (await this._driver).findElements(by);
    return await Promise.all((await collection).map(el => new Element(el)));
  }

  @log
  async open(url: string): Promise<void> {
    return await (await this._driver).get(url);
  }
}

