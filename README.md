# @aklinker1/webext-core issue 131

This is a reproduction to demonstrate issue 131.

It is designed to be run in Firefox, which is installed if this project is opened in a DevContainer.

This is simply a default install of [wxt](https://github.com/wxt-dev/wxt) using the [installation instructions](https://wxt.dev/guide/installation.html).

I then:

- Created a `src` dir and moved appropriate code into it
- Modified `wxt.config.ts`: browser config and `srcDir` definition
- Modified `project.json`: added `@webext-core/messaging` and `@webext-core/proxy-service` and `watch` script
- Modified `@/entrypoints/background.ts`: added service registration
- Modified `@/entrypoints/content.ts`: added example code
- Added `@/services`
- Added `@/types`
- Added `@/util`

## Expected behavior

The Content Script entrypoint runs two examples.

- The first example will complete successfully.
- The second example will fail with a `TypeError: can't access property "write", this.log is undefined`
