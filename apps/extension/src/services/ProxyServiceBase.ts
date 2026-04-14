import { CreateLogger } from "@/util/logger";

export abstract class ProxyServiceBase {
  protected log = CreateLogger("Proxy Service");

  public abstract registerServices(): void;
}
