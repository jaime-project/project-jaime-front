# BUILDER
# ---------------------------------------

FROM node:12-alpine AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./
RUN npm install

RUN npm run-script build


# APP
# ---------------------------------------

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

ARG ARG_VERSION=local

ENV VERSION ${ARG_VERSION}
ENV TZ America/Argentina/Buenos_Aires
ENV PORT 80
ENV JAIME_HOST jaime
ENV JAIME_PORT 5000

COPY --from=builder /app/dist/project-jaime-front .
COPY nginx.conf /tmp

CMD ["/bin/sh", "-c", "service nginx stop && envsubst < /tmp/nginx.conf > /etc/nginx/conf.d/default.conf && nginx-debug -g 'daemon off;'"]