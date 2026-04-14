import { CreateLogger, type Logger } from "./logger";

export const wait = (ms: number, logger?: Logger) => {
  const log = CreateLogger("wait", logger);
  log.info("%sms", ms);
  return new Promise<void>(
    (r) => void setTimeout(() => (log.info("resolving"), r()), ms),
  );
};
