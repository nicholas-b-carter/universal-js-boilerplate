# Use Node v4 as the base image.
FROM node:6.2.1

# Add everything in the current directory to our image, as the 'app' folder.
ADD . /app

# Install dependencies
RUN cd /app; \
    npm install --production

# Expose our server port.
EXPOSE 3000

# Run our app.
CMD ["node", "/app/index.js"]