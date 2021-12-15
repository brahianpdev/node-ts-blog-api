FROM node:alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "tsconfig.json", ".env.example", "./"]

RUN npm install 

COPY . .

CMD ["npm", "start"]