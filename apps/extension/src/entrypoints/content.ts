import { proxyServiceWorking, proxyServiceBroken } from "@/services";
import { CreateLogger } from "@/util/logger";

export default defineContentScript({
  matches: ["*://*.google.com/*"],
  async main() {
    const services = proxyServiceBroken.createProxy();
    const verificationService =
      proxyServiceWorking.createProxy("verification");

    console.log("Hello content.");

    const example1 = async () => {
      // This will work
      const log = CreateLogger("Example 1");
      try {
        log.info("execute");
        await verificationService.verify();
        log.info("success");
      } catch (e) {
        log.error("failed: %o", e);
      } finally {
        log.info("complete");
      }
    };

    const example2 = async () => {
      // This will not
      const log = CreateLogger("Example 2");
      try {
        log.info("execute");
        await services.verification.verify();
        log.info("success");
      } catch (e) {
        log.error("failed: %o", e);
      } finally {
        log.info("complete");
      }
    };

    await example1();
    await example2();
  },
});
