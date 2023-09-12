export const generateRandomNum = () => {
  let randomStr = `${parseInt(Math.random() * 2000000)}`;
  let len = randomStr.length;
  return +(len < 6 ? randomStr.padEnd(6, "0") : randomStr.slice(0, 6));
};
