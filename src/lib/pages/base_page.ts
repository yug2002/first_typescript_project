import IFind from '../interfaces/i_find';
import Element from '../elements/base_element'
import { By, ThenableWebDriver, until } from 'selenium-webdriver';
import * as wait from '../../utils/wait';
import { Predicate } from '../interfaces/i_predicate';
import Log from '../logger/log';

export default abstract class BasePage implements IFind {
  private _driver: ThenableWebDriver;
  private  predicate: Predicate;

  constructor(driver: ThenableWebDriver) {
    this._driver = driver;
  }

  async find(by: By): Promise<Element> {
    await Log.debug(`find element with locator ${by}`);
    this.predicate = (async () => (await (await this._driver).findElements(by)).length > 0);
    await wait.waitFor(this.predicate);
    return new Element((await this._driver).findElement(by));
  }

  async findAll(by: By): Promise<Element[]> {
    await Log.debug(`find elements with locator ${by}`);
    this.predicate = (async () => (await (await this._driver).findElements(by)).length > 0);
    await wait.waitFor(this.predicate);
    const collection = (await this._driver).findElements(by);
    return await Promise.all((await collection).map(el => new Element(el)));
  }

  async open(url: string): Promise<void> {
    return await (await this._driver).get(url);
  }
}

