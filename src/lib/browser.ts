import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import Data from '../constants';
import { writeFile } from 'fs';
import Log from './logger/log';

const chromeOptions = (): chrome.Options =>  {
  const opts = new chrome.Options();
  opts.addArguments("test-type");
  opts.addArguments("start-maximized");
  opts.addArguments("--js-flags=--expose-gc");
  opts.addArguments("--enable-precise-memory-info");
  opts.addArguments("--disable-popup-blocking");
  opts.addArguments("--disable-default-apps");
  opts.addArguments("--disable-infobars");
  return opts;
};

const firefoxOptions = (): firefox.Options => {
  const opts = new firefox.Options();
  return opts;
}

export default class Browser {

  private static instance: Browser;
  private _driver: ThenableWebDriver;
  private constructor() {
    if (Browser.instance) {
      throw new Error("Error - use Browser.getInstance()");
    }
  };

  public static getInstance(): Browser {
    if(!Browser.instance) {
      Browser.instance = new Browser();
    }

    return Browser.instance;
  }

  public get currDriver(): ThenableWebDriver {
    return this._driver
  }

  public async open(url: string) {
    await this.pause(2000);
    return await (await this._driver).get(url);
  };

  public async stop() {
    try {
      await (await this._driver).quit();
    } catch(e) {
      if(e instanceof Error) {
        console.log(e);
      }
    } finally {
      Browser.instance = null;
      this._driver = null;
      await Log.debug(Data.currentBrowser + ' stop');
    }
  };

  public async pause(milliseconds: number) {
    return await (await this._driver).sleep(milliseconds);
  }

  private async setBrowser(name: string) {
    this._driver = new Builder().forBrowser(name).build();
    await Log.debug(Data.currentBrowser + ' start');
    return await this._driver.manage().window().maximize();
  }

  public async start() {
    await this.setBrowser(Data.currentBrowser);
  }

  public async takeScreenshot(file: string) {
    return (await this._driver).takeScreenshot().then(
      image => writeFile (file, image, 'base64', (error) => console.log(error + ' some error in takeScreenshot')));
  }
}
