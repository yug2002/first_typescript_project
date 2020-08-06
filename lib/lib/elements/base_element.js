"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
class Element {
    constructor(element) {
        if (element instanceof selenium_webdriver_1.WebElement) {
            this._element = element;
        }
        else {
        }
    }
    findElement(locator) {
        let element = this._element.findElement(locator);
        return element;
    }
    findElements(locator) {
        return this._element.findElements(locator);
    }
    async find(locator) {
        return new Element(await this.findElement(locator));
    }
    async findAll(locator) {
        let coll = await this.findElements(locator);
        return coll.map(el => new Element(el));
    }
    click() {
        throw new Error("Method not implemented.");
    }
    sendKeys(...var_args) {
        throw new Error("Method not implemented.");
    }
    getTagName() {
        throw new Error("Method not implemented.");
    }
    getCssValue(cssStyleProperty) {
        throw new Error("Method not implemented.");
    }
    getAttribute(attributeName) {
        throw new Error("Method not implemented.");
    }
    getText() {
        throw new Error("Method not implemented.");
    }
    getSize() {
        throw new Error("Method not implemented.");
    }
    getRect() {
        throw new Error("Method not implemented.");
    }
    getLocation() {
        throw new Error("Method not implemented.");
    }
    isEnabled() {
        throw new Error("Method not implemented.");
    }
    isSelected() {
        throw new Error("Method not implemented.");
    }
    submit() {
        throw new Error("Method not implemented.");
    }
    clear() {
        throw new Error("Method not implemented.");
    }
    isDisplayed() {
        throw new Error("Method not implemented.");
    }
    getId() {
        throw new Error("Method not implemented.");
    }
}
exports.default = Element;
//# sourceMappingURL=base_element.js.map