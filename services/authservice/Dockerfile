FROM node:14

WORKDIR /app

COPY package.json package-lock.json* /app/
RUN npm cache clean --force
RUN npm install
RUN npm install bcrypt

COPY . .

EXPOSE 3000

# CMD npm start
CMD [ "node", "server.js" ]