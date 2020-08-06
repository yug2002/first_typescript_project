import { By } from 'selenium-webdriver';
import Element from '../elements/base_element';

export default interface IFind {
  find(by: By): Promise<Element>;
  findAll(by: By): Promise<Element[]>;
}