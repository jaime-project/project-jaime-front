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

FROM nginx:1.21.1-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

ARG ARG_VERSION=local

ENV VERSION ${ARG_VERSION}
ENV PORT 80
ENV TZ America/Argentina/Buenos_Aires

EXPOSE ${PORT}

COPY --from=builder /app/dist/project-jaime-front .
COPY nginx.conf /etc/nginx/conf.d/default.conf