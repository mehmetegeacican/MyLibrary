# Use an official Node.js runtime as the base image
FROM node:20-alpine
# Set the working directory inside the container
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# COPY ENV variable
COPY .env ./
# COPY tsconfig.json file
COPY tsconfig.json ./
# COPY
COPY . .
# Install app dependencies
RUN npm install
# Expose the port your app listens on (match PORT/default)
EXPOSE 4000
# Specify the command to run your Express app
CMD ["npm", "run", "start"]