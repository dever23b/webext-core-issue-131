import { CreateLogger } from "@/util/logger";
import type { ExtensionMessagingConfig } from "@webext-core/messaging";
import { ProxyServiceLogger } from "./ProxyServiceLogger";

export abstract class ProxyServiceBase {
  protected log = CreateLogger("Proxy Service");

  public abstract registerServices(): void;

  protected generateConfig(
    label: string,
    filter: (messageType: string) => boolean,
  ) {
    const log = this.log.createChild(label);
    const config: ExtensionMessagingConfig = {
      logger: new ProxyServiceLogger(log, filter),
    };

    return config;
  }
}
