import { SupportedBrowsers as browsers } from './lib/supported_browsers'

export default class Data {
  static currentBrowser = browsers[browsers.chrome];
  static applicationUrl = 'https://todo.microsoft.com/tasks/';
  static timeout = 15000;
  static login = 'yug2002@yandex.by';
  static password = '12344321abcd';

  static pageLocators = {
    common: {
      inputByType: (type: string) => `//input[@type='${type}']`,
      buttonByName: (name: string) => `//a[./*[text()='${name}']]`
    },
    homePage: {
      title: `//h1/span`,
    },
    loginPage: {
      personalAccount: `//div[@class = 'row tile'][.//*[text() = 'Personal account']]`,
      errorElement: (error: string) => `//div[@id = '${error}Error']`
    },
    todoPage: {
      title: '//a/span'
    }
  }
}