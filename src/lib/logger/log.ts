import { factory as log } from './config_log4j';

const l = log.getLogger(`product.Log`);

export default class Log {

  public static debug(msg: string): void {
    l.debug(msg);
  }

  public static info(msg: string): void {
    l.info(msg);
  }

  public static error(msg: string): void {
    l.error(msg);
  }
}