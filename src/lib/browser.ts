import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import { SupportedBrowsers as browsers } from './supported_browsers';
import Data from '../constants';

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
  private driver: ThenableWebDriver;

  private constructor(){};

  public static getInstance(): Browser {
    if(!Browser.instance) {
      Browser.instance = new Browser();
    }

    return Browser.instance;
  }

  public get getChromeDriver(): ThenableWebDriver {
    return new Builder().forBrowser('chrome').setChromeOptions(chromeOptions()).build()
  };

  public get getFirefoxDriver(): ThenableWebDriver {
    return new Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions()).build()
  }

  public async setUpDriver(driver: ThenableWebDriver): Promise<void> {
    return await driver.manage().window().maximize();
  }
  
  public get wrappedDriver(): ThenableWebDriver {
    return this.getDriver(Data.currentBrowser);
  }
  public async open(url: string): Promise<void> {
    return await (await this.driver).get(url);
  };

  public async close(): Promise<void> {
    try {
      await (await this.driver).quit();
    } catch(e) {
      if(e instanceof Error) {
        console.log(e);
      }      
    } finally {
      Browser.instance = null;
      this.driver = null;
    }    
  };

  public async pause(milliseconds: number): Promise<void> {
    return await (await this.driver).sleep(milliseconds);
  }

  private setDriver(driver: ThenableWebDriver): void  { this.driver = driver};

  private getDriver(browserType: browsers): ThenableWebDriver {
    switch(browserType) {
      case browsers.chrome: this.setDriver(this.getChromeDriver); break;
      case browsers.firefox: this.setDriver(this.getFirefoxDriver); break;
      default: throw new Error('There is no any browser found');
    }
    return this.driver;
  }
}