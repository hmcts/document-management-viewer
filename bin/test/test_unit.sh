#!/bin/sh
set -ex

# Kill & Run app
pkill -f "node test-app"
nohup node test-app &

yarn run-tests

# Kill app
pkill -f "node test-app"
