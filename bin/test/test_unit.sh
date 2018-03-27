#!/bin/sh
set -ex

#Run app
nohup node test-app &

yarn run-tests

# Kill app
pkill -f "node test-app"
