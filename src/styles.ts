import type { StyleInput, StyleType } from './types';

export const styles: Record<StyleType, StyleInput> = {
  base: ['font-size: 11px;', 'font-weight: normal;'],
  code: [
    'display: inline-block;',
    'font-family: ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Monaco, Consolas, monospace;',
    'padding: 1px 4px;',
    'font-size: 10px;',
    'background-color: #E92063;',
    'font-weight: bold;',
    'color: #111111;',
    'border-radius: 3px;',
    'vertical-align: top;',
  ],
};
