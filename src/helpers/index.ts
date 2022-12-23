export const pad = (value: number) => `${value <= 9 ? '0' : ''}${value}`;

export const timestamp = () => {
  const date = new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date.getMilliseconds()}`;
};
