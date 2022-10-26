

FROM alpine:3.16.2

RUN apk update && apk add docker-compose 

WORKDIR /app

COPY . /app
