import Data from '../../constants';
import IFind from '../interfaces/i_find';
import Element from '../elements/base_element' 
import { By, ThenableWebDriver, Locator } from 'selenium-webdriver';
import * as wait from '../../utils/wait';
import IPredicate from '../interfaces/i_predicate'; 

export default abstract class BasePage implements IFind {
  private _driver: ThenableWebDriver;
  private  predicate: IPredicate;

  constructor(driver: ThenableWebDriver) {
    this._driver = driver;
  }

  async find(by: Locator): Promise<Element> {
    this.predicate = (async () => (await (await this._driver).findElements(by)).length > 0);
    await wait.waitFor(this.predicate);
    return new Element((await this._driver).findElement(by));    
  }
  
  async findAll(by: By): Promise<Element[]> {
    this.predicate = (async () => (await (await this._driver).findElements(by)).length > 0);
    await wait.waitFor(this.predicate);
    let collection = (await this._driver).findElements(by);    
    return await Promise.all((await collection).map(el => new Element(el)));
  }

  async open(url: string): Promise<void> {
    return await (await this._driver).get(url);
  }

}

