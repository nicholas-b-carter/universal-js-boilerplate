#!/bin/bash

# This is the "watch" command in the package.json.
# Use this to develop from inside a docker container but using your local file system.
# It work especially great for project using old version of node.


docker stop nodeApp 2>/dev/null      # stop running container
docker rm nodeApp 2>/dev/null        # remove container logs

docker run -d \                        # start new daemon
  -e "DEBUG=express:*,node_app:*" \  # turn on NPM debugging
  --name nodeApp \                   # name the container
  -p 3000:3000 \                       # map internal to external port
  -v /Users/puppybits/nodeApp:/app \ # override container w/ local dev files
  my/project \                         # container name
  nodemon -L app.js           # start nodemon to watch for changes

docker logs -f nodeApp               # watch container logs

# single line command
docker stop nodeApp 2>/dev/null && docker rm nodeApp 2>/dev/null && docker run -d -e "DEBUG=express:*,node_app:*" --name nodeApp -p 3000:3000 -v /Users/puppybits/nodeApp:/app my/project nodemon server/index.js && docker logs -f nodeApp
