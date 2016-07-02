FROM node

RUN mkdir -p /app
WORKDIR /app

# Expose our server port.
EXPOSE 3000

# cache will almost always bust here, but it's only copying files
COPY . /app/

# .deps.json will only bust the cache when the package.json dependencies change
COPY .deps.json /app/package.json
RUN npm install --production

CMD npm start