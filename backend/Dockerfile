FROM node:22

WORKDIR /app/backend

COPY package*.json .

RUN npm i && npm install -g wrangler

COPY . .

EXPOSE 8787

CMD ["npm", "run", "dev"]