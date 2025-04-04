# ---------------------------------------
# BUILDER
# ---------------------------------------

FROM docker.io/library/node:22-alpine AS builder

WORKDIR /home/src

COPY . .

RUN npm install && npm run build


# ---------------------------------------
# FINAL IMAGE
# ---------------------------------------

FROM docker.io/nginxinc/nginx-unprivileged:1.27.4

ARG ARG_VERSION=local

WORKDIR /usr/share/nginx/html

USER root

COPY --from=builder /home/src/dist/project-jaime-front/ .
COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod 770 . -R

USER 1001

ENV VERSION=${ARG_VERSION}
ENV TZ=America/Argentina/Buenos_Aires
ENV JAIME_URL=http://0.0.0.0:5000

CMD ["/bin/bash", "-c", "envsubst < assets/appconfig.env.json > assets/appconfig.json && nginx-debug -g 'daemon off;'"]
