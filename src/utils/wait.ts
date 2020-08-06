import data from '../constants';
const delay = data.timeout;

export const waitFor = async (predicate: () => Promise<boolean>, milliseconds: number = delay):
 Promise<boolean> => new Promise (resolve => {
  const dl = 200;
  let mls = milliseconds;
  const f = async () => {
    mls -= dl;
    if (await predicate() || mls < dl) {
      resolve(true);
    }
    else {
      setTimeout(f, dl);
    }
  };
  f();
});
