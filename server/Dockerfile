FROM node:22-alpine

WORKDIR /app
RUN apk add --no-cache python3 make g++ gcc musl-dev

COPY package*.json ./

COPY . .

EXPOSE 3001
RUN npm ci

CMD ["npm", "start"]