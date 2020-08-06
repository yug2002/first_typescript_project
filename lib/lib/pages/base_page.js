"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_element_1 = __importDefault(require("../elements/base_element"));
class BasePage {
    constructor(driver) {
        this._driver = driver;
    }
    async find(by) {
        return new base_element_1.default((await this._driver).findElement(by));
    }
    async findAll(by) {
        let collection = (await this._driver).findElements(by);
        let coll = await Promise.all((await collection).map(el => new base_element_1.default(el)));
        return coll;
    }
}
exports.default = BasePage;
//# sourceMappingURL=base_page.js.map