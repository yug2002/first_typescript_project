import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const chromeOptions = ():chrome.Options =>  {
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