import type { StyleInput } from './types';

export function pad(value: number) {
  return `${value <= 9 ? '0' : ''}${value}`;
}

export function timestamp() {
  const date = new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date.getMilliseconds()}`;
}

export function decToHex(dec: number, padding = 6) {
  let hex = dec.toString(16);

  while (hex.length < padding) {
    hex = `0${hex}`;
  }

  return hex;
}

export function normalizeColor(color: string | number) {
  if (typeof color === 'string') {
    return color;
  }

  if (typeof color === 'number') {
    return `#${decToHex(color)}`;
  }

  return '#FFFFFF';
}

export function normalizeStyle(style: StyleInput) {
  if (typeof style === 'string') {
    return style;
  }

  return style.join('');
}
