export class Logger {
  #label: string | Logger.LabelFunction = "";

  public get label() {
    return typeof this.#label === "string"
      ? this.#label
      : this.#label();
  }

  public constructor(label: string = "") {
    this.#label = label;
  }

  public createChild(label: string = "") {
    if (this.label) {
      label = `${this.label}:${label}`;
    }

    return new Logger(label);
  }

  public debug(...args: any[]) {
    this.#write(Logger.Level.DEBUG, args);
  }

  public error(...args: any[]) {
    this.#write(Logger.Level.ERROR, args);
  }

  public info(...args: any[]) {
    this.#write(Logger.Level.INFO, args);
  }

  public log(...args: any[]) {
    this.#write(Logger.Level.LOG, args);
  }

  public warn(...args: any[]) {
    this.#write(Logger.Level.WARN, args);
  }

  public write(...args: any[]) {
    this.#write(Logger.Level.LOG, args);
  }

  #prepend(arg: any, args: any[]) {
    if (typeof args[0] === "string" || args[0] instanceof String) {
      args[0] = `${arg} ${args}`;
    } else {
      args.unshift(arg);
    }

    return args;
  }

  #write(level: Logger.Level, args: any[]) {
    const method: keyof Console = level;
    const log = console[method];
    const isFirstArgString =
      typeof args[0] === "string" || args[0] instanceof String;

    if (level == Logger.Level.DEBUG) {
      args = this.#prepend("[DEBUG]", args);
    }

    if (this.label) {
      args = this.#prepend(`[${this.label}]`, args);
    }

    if (typeof log !== "function") {
      throw new TypeError("Invalid log level");
    }

    log.apply(console, args);
  }
}

export namespace Logger {
  export type LabelFunction = () => string;
  export enum Level {
    DEBUG = "debug",
    ERROR = "error",
    INFO = "info",
    LOG = "log",
    WARN = "warn",
  }
}

const log = new Logger();
export const CreateLogger = (name: string, parent: Logger = log) =>
  parent.createChild(name);
