import type { Logger } from "@/util/logger";

export class ProxyServiceLogger {
  #filter;
  #log;
  public constructor(
    logger: Logger,
    filter: (type: string) => boolean,
  ) {
    this.#filter = filter;
    this.#log = logger;
  }

  public debug(...args: any[]) {
    this.write("debug", args);
  }
  public error(...args: any[]) {
    this.write("error", args);
  }
  public log(...args: any[]) {
    this.write("write", args);
  }
  public warn(...args: any[]) {
    this.write("warn", args);
  }

  /**
   * Search log args for anything resembling a message object
   * and, if found, return whether the message object matches
   * the filter for this logger
   */
  private filter(args: any[]) {
    // search for message objects, if found
    // then filter by this instance type
    for (const message of args) {
      if (typeof message === "object") {
        if (typeof message.type == "string") {
          return this.#filter(message.type);
        }
      }
    }

    return true;
  }

  private write(
    level: "debug" | "error" | "write" | "warn",
    args: any[],
  ) {
    if (this.filter(args)) {
      const method = this.#log[level];
      method.apply(this.#log, args);
    }
  }
}
