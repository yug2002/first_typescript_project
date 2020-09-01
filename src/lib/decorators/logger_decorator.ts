import Log from '../logger/log';

export function log(target: any, method: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function(...args: any[]) {
    const returnValue = await originalMethod.apply(this, args);
    if(args.length !== 0) {
      await Log.debug(`[${target.constructor.name}] -> [${method}] -> ${JSON.stringify(args)}`);
    } else {
      await Log.debug(`[${target.constructor.name}] -> [${method}]`);
    }
    return returnValue;
  }
}