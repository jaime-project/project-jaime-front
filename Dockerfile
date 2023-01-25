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

FROM nginxinc/nginx-unprivileged:latest

WORKDIR /usr/share/nginx/html

USER root

COPY --from=builder /app/dist/project-jaime-front .
COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod 777 . -R

USER nginx

ARG ARG_VERSION=local

ENV VERSION=${ARG_VERSION}
ENV TZ=America/Argentina/Buenos_Aires
ENV JAIME_URL=http://localhost:5000

CMD ["/bin/bash", "-c", "service nginx stop && envsubst < assets/appconfig.env.json > assets/appconfig.json && nginx-debug -g 'daemon off;'"]
