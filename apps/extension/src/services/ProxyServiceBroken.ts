import {
  createProxyService,
  registerService,
} from "@webext-core/proxy-service";
import { ProxyServiceBase } from "./ProxyServiceBase";
import * as LocalServices from "./allButProxy";

class ProxyServiceBroken extends ProxyServiceBase {
  private services = {
    verification: LocalServices.verificationService,
  };

  public createProxy() {
    return createProxyService<typeof this.services>("services");
  }

  public registerServices() {
    void registerService("services", this.services);
  }
}

export type { ProxyServiceBroken };
export const proxyServiceBroken = new ProxyServiceBroken();
