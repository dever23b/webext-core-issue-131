import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  browser: "firefox",
  srcDir: "src",
  webExt: {
    binaries: {
      firefox: "firefox-devedition",
    },
    startUrls: [
      "about:debugging#/runtime/this-firefox",
      "https://www.google.com",
    ],
  },
});
