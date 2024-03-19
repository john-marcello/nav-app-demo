# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set a working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

# use this command build/tag docker image from the shell script
# ./build-docker.sh