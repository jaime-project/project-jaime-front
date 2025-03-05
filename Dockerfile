# BUILDER
# ---------------------------------------

FROM docker.io/library/node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

# APP
# ---------------------------------------

FROM docker.io/nginxinc/nginx-unprivileged:1.24

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/project-jaime-front/ .
COPY nginx.conf /etc/nginx/nginx.conf

USER root
RUN chown -R 1001:0 .

USER 1001

ARG ARG_VERSION=local

ENV VERSION=${ARG_VERSION}
ENV TZ=America/Argentina/Buenos_Aires
ENV JAIME_URL=http://0.0.0.0:5000

CMD ["/bin/bash", "-c", "envsubst < assets/appconfig.env.json > assets/appconfig.json && nginx-debug -g 'daemon off;'"]
