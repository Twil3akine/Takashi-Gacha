FROM node:20-alpine

WORKDIR /app/backend

COPY package*.json .

RUN npm i && npm install -g wrangler

COPY . .

CMD ["npm", "run", "dev"]