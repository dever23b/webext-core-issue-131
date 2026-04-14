#!/bin/bash

NPMRC_PATH="/home/node/.npmrc"

function test_npmrc() {
    if [ ! -f "$NPMRC_PATH" ]; then
    echo "NPMRC was not imported successfully"
    mount
    exit 1
    fi

    echo "NPMRC imported from host"
    cat "$NPMRC_PATH"
}

# The mount isn't actually available at this stage during build,
# so there's nothing to do at this stage
