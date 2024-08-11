# STEPS TO RUN DOCKER IMAGE
# docker build -t interview-app:dev .
# docker run -p 5173:5173 interview-app:dev

# Use the official lightweight Node.js 20 image.
# https://hub.docker.com/_/node
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json .

# Copy tsconfig.json for TypeScript configuration
COPY tsconfig.json .

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY . .

# Expose the port the app runs on
EXPOSE  5173

# Run the application
CMD [ "npm", "run", "dev" ]
