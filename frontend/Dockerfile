FROM node:20-alpine

WORKDIR /app/frontend

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]