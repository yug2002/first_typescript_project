import { IWebElementFinders, Locator, WebElementPromise, WebElement, ThenableWebDriver } from 'selenium-webdriver';
import IFind from '../interfaces/i_find';
import Log from '../logger/log'
import Browser from '../browser';

export default class Element implements IWebElementFinders, IFind  {
  private _element: WebElement;

  constructor(element: WebElement);
  constructor(element?: any) {
    if(element instanceof WebElement) {
      this._element = element;
    }
  }

   findElement(locator: Locator): WebElementPromise {

    return this._element.findElement(locator);
  }

  findElements(locator: Locator): Promise<WebElement[]> {

    return this._element.findElements(locator);
  }

  async find(locator: Locator): Promise<Element> {
    await Log.debug('find element with locator ' + locator);
    return new Element ( await this.findElement(locator));
  }

  async findAll(locator: Locator): Promise<Element[]> {
    await Log.debug('find all elements with locator ' + locator);
    const collection = await this.findElements(locator);
    return collection.map(el => new Element(el));
  }

  async click(): Promise<void> {
    await Log.debug(' and click');
    return await this._element.click();
  }

  async type(text:string): Promise<void> {
    await Log.debug(` and type '${text}'`)
    return await this._element.sendKeys(text);
  }

  getTagName(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getCssValue(cssStyleProperty: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getAttribute(attributeName: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async getText(): Promise<string> {
    await Log.debug(' and get text');
    return await this._element.getText();
  }

  getSize(): Promise<import("selenium-webdriver").ISize> {
    throw new Error("Method not implemented.");
  }

  getRect(): Promise<import("selenium-webdriver").IRectangle> {
    throw new Error("Method not implemented.");
  }

  getLocation(): Promise<import("selenium-webdriver").ILocation> {
    throw new Error("Method not implemented.");
  }
  isEnabled(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  isSelected(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  submit(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async isDisplayed(): Promise<boolean> {
    await Browser.getInstance().pause(3000);
    await Log.debug(' and check that element is displayed');
    return await this._element.isDisplayed();
  }
  getId(): Promise<import("selenium-webdriver").IWebElementId> {
    throw new Error("Method not implemented.");
  }
}