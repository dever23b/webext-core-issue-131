import { proxyServiceBroken, proxyServiceWorking } from "@/services";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  proxyServiceBroken.registerServices();
  proxyServiceWorking.registerServices();
});
