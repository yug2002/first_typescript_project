import Log from '../logger/log';

export function log(target: any, method: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function(...args: any[]) {
    const returnValue = await originalMethod.apply(this, args);
    const r = typeof(returnValue) === 'string' || typeof(returnValue) === 'boolean'  ? returnValue : '';
    if(args.length !== 0) {
      await Log.debug(`class name:[${target.constructor.name}] -> method name:[${method}] -> ${JSON.stringify(args)}`);
    } else {
      await Log.debug(`class name:[${target.constructor.name}] -> method name:[${method}]: return -> [${r}]`);
    }
    return returnValue;
  }
}