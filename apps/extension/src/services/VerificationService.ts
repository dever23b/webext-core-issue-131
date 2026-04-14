import { CreateLogger } from "../util/logger";
import { wait } from "../util/wait";

class VerificationService {
  private log = CreateLogger("Verification Service");

  public async verify() {
    this.log.write("Attempting verification...");
    // ... do verification stuff
    return wait(1000).then(() => true);
  }
}

export type { VerificationService };
export const verificationService = new VerificationService();
