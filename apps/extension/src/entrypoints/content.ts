import { proxyServiceWorking, proxyServiceBroken } from "@/services";
import { runExample } from "@/util/runExample";

export default defineContentScript({
  matches: ["*://*.google.com/*"],
  async main() {
    console.log("Hello content.");

    const example1 = async () => {
      // This will work
      const verificationService =
        proxyServiceWorking.createProxy("verification");
      await runExample("Example 1", verificationService.verify);
    };

    const example2 = async () => {
      // This will not
      const services = proxyServiceBroken.createProxy();
      await runExample("Example 2", services.verification.verify);
    };

    await example1();
    await example2();
  },
});
