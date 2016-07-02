#!/bin/bash

# This is the "build" command in the package.json.
# This build command will keep build time < 10s (except when a npm dependency changes).

#  Rational: Docker's cache check the file hash for each line
#  when a file has changed in any way it will bust the cache.
#  This is problematic for package.json files that change
#  frequently even with the dependencies are the same.
#  In order to correct this we'll copy just the package.json
#  dependencies to docker, run `npm install` then override it
#  with the project files. That will build times to < 10s.

node -e \" \
  require('fs').writeFileSync( \
  '.deps.json', \
  JSON.stringify({ \
    dependencies:require('./package.json').dependencies \
  }))\" && \                                               # create file with only npm dependencies
docker build -t my/project . && \                          # build the docker container
rm .deps.json                                              # remove the dependencies-only file
