"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = __importDefault(require("selenium-webdriver/chrome"));
const firefox_1 = __importDefault(require("selenium-webdriver/firefox"));
const supported_browsers_1 = require("./supported_browsers");
const constants_1 = __importDefault(require("../constants"));
const chromeOptions = () => {
    const opts = new chrome_1.default.Options();
    opts.addArguments("test-type");
    //opts.addArguments("start-maximized");
    opts.addArguments("--js-flags=--expose-gc");
    opts.addArguments("--enable-precise-memory-info");
    opts.addArguments("--disable-popup-blocking");
    opts.addArguments("--disable-default-apps");
    opts.addArguments("--disable-infobars");
    return opts;
};
const firefoxOptions = () => {
    const opts = new firefox_1.default.Options();
    return opts;
};
class Browser {
    constructor() { }
    ;
    static getInstance() {
        if (!Browser.instance) {
            Browser.instance = new Browser();
        }
        return Browser.instance;
    }
    get getChromeDriver() {
        return new selenium_webdriver_1.Builder().forBrowser('chrome').setChromeOptions(chromeOptions()).build();
    }
    ;
    get getFirefoxDriver() {
        return new selenium_webdriver_1.Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions()).build();
    }
    async setUpDriver(driver) {
        return await driver.manage().window().maximize();
    }
    get wrappedDriver() {
        return this.getDriver(constants_1.default.currentBrowser);
    }
    async open(url) {
        return await (await this.driver).get(url);
    }
    ;
    async close() {
        try {
            await (await this.driver).quit();
        }
        catch (e) {
            if (e instanceof Error) {
                console.log(e);
            }
        }
        finally {
            Browser.instance = null;
            this.driver = null;
        }
    }
    ;
    async pause(milliseconds) {
        return await (await this.driver).sleep(milliseconds);
    }
    setDriver(driver) { this.driver = driver; }
    ;
    getDriver(browserType) {
        switch (browserType) {
            case supported_browsers_1.SupportedBrowsers.chrome:
                this.setDriver(this.getChromeDriver);
                break;
            case supported_browsers_1.SupportedBrowsers.firefox:
                this.setDriver(this.getFirefoxDriver);
                break;
            default: throw new Error('There is no any browser found');
        }
        return this.driver;
    }
}
exports.default = Browser;
//# sourceMappingURL=browser.js.map