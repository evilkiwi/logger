var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const pad = (value) => `${value <= 9 ? "0" : ""}${value}`;
const timestamp = () => {
  const date = new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date.getMilliseconds()}`;
};
var PrintLevel;
(function(PrintLevel2) {
  PrintLevel2["Log"] = "log";
  PrintLevel2["Debug"] = "debug";
  PrintLevel2["Error"] = "error";
  PrintLevel2["Info"] = "info";
  PrintLevel2["Store"] = "store";
})(PrintLevel || (PrintLevel = {}));
let namespace = {
  name: ""
};
let styled = true;
const setNamespace = (newNamespace) => namespace = newNamespace;
const setStyled = (isStyled) => styled = isStyled;
const codeRegex = /(`([^`]*)`)+/g;
const style = `
    font-size: 11px;
    font-weight: normal;
`;
const code = `
    display: inline-block;
    font-family: ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Monaco, Consolas, monospace;
    padding: 1px 4px;
    font-size: 10px;
    background-color: #E92063;
    font-weight: bold;
    color: #111111;
    border-radius: 3px;
    vertical-align: top;
`;
const print = (opts) => {
  const localStyle = `${style} ${opts.color ? opts.color : ""}`;
  const styles = [localStyle];
  const level = opts.call ?? `${opts.level}`;
  const startStyle = styled ? "%c" : "";
  let loggerPrefix = opts.prefix ?? "";
  let namespacePrefix = "";
  let text = opts.message;
  loggerPrefix = loggerPrefix.length > 0 ? `[${loggerPrefix}] ` : "";
  if (namespace.name.length > 0) {
    namespacePrefix = `${startStyle}[${namespace.name}] `;
    styles.unshift(namespace.color ? `color: ${namespace.color};` : localStyle);
  }
  text = `${namespacePrefix}${startStyle}${loggerPrefix}${text} @ ${timestamp()}`;
  const total = (text.match(codeRegex) ?? []).length;
  for (let i = 0; i < total; i++) {
    styles.push(code, localStyle);
  }
  text = text.replace(codeRegex, `${startStyle}$2${startStyle}`);
  console[level](text, ...styled ? styles : [], ...opts.args ?? []);
};
const createLogger = (options = {}) => {
  const group2 = (message, context, collapsed = false, level, prefix) => {
    print({
      level: level ?? PrintLevel.Log,
      message,
      prefix,
      call: collapsed ? "groupCollapsed" : "group"
    });
    if (context) {
      context();
      groupEnd2();
    }
  };
  const groupCollapsed2 = (message, context) => group2(message, context, true, void 0, options.name);
  const groupEnd2 = () => console.groupEnd();
  const debug2 = (message, ...args) => print({
    level: PrintLevel.Debug,
    prefix: options.name,
    message,
    args
  });
  const log2 = (message, ...args) => print({
    level: PrintLevel.Log,
    message,
    args
  });
  const info2 = (message, ...args) => print({
    level: PrintLevel.Info,
    prefix: options.name,
    message,
    args
  });
  const error2 = (message, ...args) => print({
    level: PrintLevel.Error,
    prefix: options.name,
    message,
    args,
    color: "#FFFFFF"
  });
  const logger = {
    group: group2,
    groupCollapsed: groupCollapsed2,
    groupEnd: groupEnd2,
    debug: debug2,
    log: log2,
    info: info2,
    error: error2
  };
  function useLogger2() {
    return logger;
  }
  return __spreadProps(__spreadValues({}, logger), {
    useLogger: useLogger2
  });
};
const {
  group,
  groupCollapsed,
  groupEnd,
  debug,
  log,
  info,
  error,
  useLogger
} = createLogger();
export { PrintLevel, createLogger, debug, error, group, groupCollapsed, groupEnd, info, log, setNamespace, setStyled, useLogger };
