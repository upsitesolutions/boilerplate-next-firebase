#!/bin/bash


# kill the following ports 9399 5002 9099 5001 8080 8282 5000 8085 9199
npx kill-port 9399 5002 9099 5001 8080 8282 5000 8085 9199

# Set the environment variables for the Firebase-admin SDK
# get current directory
export CURRENT_DIR=$(pwd)
export GOOGLE_APPLICATION_CREDENTIALS=$CURRENT_DIR/website/serviceAccountKey.json

export FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
export FIRESTORE_EMULATOR_HOST=localhost:8080
# you can set more environment variables here....

# Start Firebase emulators with the log output to /logs
# remember to create a folder called fb_data
firebase emulators:start --import=./fb_data --export-on-exit