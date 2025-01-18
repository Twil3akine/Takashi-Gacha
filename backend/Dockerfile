FROM node:22-alpine

WORKDIR /app/backend

RUN apt-get install -y curl

COPY package*.json .

RUN npm i && npm install -g wrangler

COPY . .

EXPOSE 8787

CMD ["npm", "run", "dev"]