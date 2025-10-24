FROM node:24-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --verbose

COPY . .

RUN npm run prisma-generate
RUN npm run build --verbose

EXPOSE 8080

CMD ["npm", "run", "start"]
