export function pad(value: number) {
  return `${value <= 9 ? '0' : ''}${value}`;
}

export function timestamp() {
  const date = new Date();

  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date.getMilliseconds()}`;
}
