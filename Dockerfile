FROM node:14.15.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm install typescript -g
RUN npm run build

CMD ["npm", "run", "start"]