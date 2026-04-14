import type { ProxyServiceKey } from "@webext-core/proxy-service";
import type { Service } from "@webext-core/proxy-service/types";

export type ExtractService<TService> =
  TService extends ProxyServiceKey<infer S>
    ? S extends Service
      ? S
      : never
    : never;
