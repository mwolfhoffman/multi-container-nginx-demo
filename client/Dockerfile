FROM node:18-alpine3.15
WORKDIR /client

COPY package.json yarn.lock ./
RUN yarn config set strict-ssl false
RUN yarn install 
COPY . .
EXPOSE 3000

CMD ["yarn", "start"]