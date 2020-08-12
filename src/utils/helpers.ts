
export const generatedString = (num: number): string => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const str = Array.from(possible).map(() => possible[Math.floor(Math.random() * possible.length)]);
  return str.slice(0, num).join('');
};