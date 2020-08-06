import { SupportedBrowsers as browsers } from './lib/supported_browsers'

export default class Data {
  static currentBrowser = browsers.chrome;
  static applicationUrl = 'https://todo.microsoft.com/tasks/';
  static timeout = 15000;

  static pageLocators = {
    common: {
      inputByType: (type: string) => `//input[@type='${type}']`,
      buttonByName: (name: string) => `//a[./*[text()='${name}']]`
    },
    homePage: {
      title: `//h1/span`,
    },
  }
}