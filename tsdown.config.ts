import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  cwd: "/workspaces/webext-core-issue-131",
  dts: true,
  entry: ["src/*.ts", "src/*/index.ts"],
  format: ["esm", "cjs"],
  workspace: {
    include: ["packages/webext-core"],
  },
});
