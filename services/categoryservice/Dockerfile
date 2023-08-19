# Use an official Node.js runtime as the base image
FROM node:16.13

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}
# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

# Install app dependencies
RUN npm install

RUN npx prisma generate

# Expose the port that your Express app will listen on
EXPOSE 3000

# Specify the command to run your Express app
CMD ["npm", "run", "dev"]