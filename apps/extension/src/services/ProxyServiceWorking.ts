import {
  createProxyService,
  registerService,
  type ProxyServiceKey,
} from "@webext-core/proxy-service";
import { ProxyServiceBase } from "./ProxyServiceBase";
import * as LocalServices from "./allButProxy";
import type { ExtractService } from "@/types/ExtractService";
import type { Service } from "@webext-core/proxy-service/types";

class ProxyServiceWorking extends ProxyServiceBase {
  private readonly serviceKey = {
    verification:
      "verificationService" as ProxyServiceKey<LocalServices.VerificationService>,
  };

  public createProxy<
    K extends keyof typeof this.serviceKey,
    KT = (typeof this.serviceKey)[K],
    S extends Service = ExtractService<KT>,
  >(key: K) {
    const psk = this.serviceKey[key] as ProxyServiceKey<S>;
    return createProxyService<S>(psk);
  }

  public registerServices() {
    for (const [key, value] of Object.entries(this.serviceKey)) {
      void this.registerService(
        key as keyof typeof this.serviceKey,
        value as keyof typeof LocalServices,
      );
    }
  }

  private registerService(
    serviceKey: keyof typeof this.serviceKey,
    serviceName: keyof typeof LocalServices,
  ) {
    const key = this.serviceKey[serviceKey];
    const service = LocalServices[serviceName];

    if (!key) {
      this.log.error("Invalid service key: %s", serviceKey);
      return false;
    }

    if (!service) {
      this.log.error("Invalid service name: %s", serviceName);
      return false;
    }

    this.log.info("Registering service [%s]: %o", key, service);

    return registerService(key, service);
  }
}

export type { ProxyServiceWorking };
export const proxyServiceWorking = new ProxyServiceWorking();
