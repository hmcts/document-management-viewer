#!/bin/sh
set -ex

#Run app
DEBUG=express:* nohup node test-app &

yarn run-tests

# Kill app
pkill -f "node test-app"
