# Use an official Node.js runtime as the base image
FROM node:16.13

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



# Expose the port that your Express app will listen on
EXPOSE 3000

# Specify the command to run your Express app
CMD ["npm", "run", "start:dev"]