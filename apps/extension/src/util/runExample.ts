import { CreateLogger } from "./logger";

export const runExample = async (
  label: string,
  example: () => Promise<any>,
) => {
  const log = CreateLogger(label);
  try {
    log.info("execute");
    await example();
    log.info("success");
  } catch (e) {
    log.error("failed: %o", e);
  }
};
