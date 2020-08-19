import { factory as log } from './config_log4j';

export default class Log {

  public static appLog = () => Promise.resolve(log.getLogger('product.Log'))
  public static debug(msg: string): Promise<void> {
    return Log.appLog().then(res => res.debug(msg));
  }

  public static info(msg: string): Promise<void> {
    return Log.appLog().then(res => res.info(msg));
  }

  public static error(msg: string): Promise<void> {
    return Log.appLog().then(res => res.error(msg));
  }
}