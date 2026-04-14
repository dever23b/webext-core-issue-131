# @aklinker1/webext-core issue 131

This is a reproduction to demonstrate issue 131.

It is designed to be run in Firefox, which is installed if this project is opened in a DevContainer.

## Expected behavior

The Content Script entrypoint runs two examples.

- The first example will complete successfully.
- The second example will fail with a `TypeError: can't access property "write", this.log is undefined`
