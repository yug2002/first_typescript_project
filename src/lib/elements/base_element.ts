import { IWebElementFinders, Locator, WebElementPromise, WebElement } from 'selenium-webdriver';
import IFind from '../interfaces/i_find';

export default class Element implements IWebElementFinders, IFind  {
  private _element: WebElement; 

  constructor(element: WebElement);
  constructor(element?: any) {
    if(element instanceof WebElement) {
      this._element = element;
    }
    else {
      
    }
  }
  
  findElement(locator: Locator): WebElementPromise {
    return this._element.findElement(locator);
  }

  findElements(locator: Locator): Promise<WebElement[]> {
    return this._element.findElements(locator);
  }

  async find(locator: Locator): Promise<Element> {
    return new Element ( await this.findElement(locator));
  }

  async findAll(locator: Locator): Promise<Element[]> {
    let collection = await this.findElements(locator);
    return collection.map(el => new Element(el));
  }
  
  click(): Promise<void> {
    return this._element.click();
  }

  type(...var_args: (string | number | Promise<string | number>)[]): Promise<void> {
    return this._element.sendKeys(...var_args);
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

  getText(): Promise<string> {
    return this._element.getText();
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
  isDisplayed(): Promise<boolean> {
    return this._element.isDisplayed();
  }
  getId(): Promise<import("selenium-webdriver").IWebElementId> {
    throw new Error("Method not implemented.");
  }
}