VERSION := 1.7.0

docker-build b:
	podman build . -t ghcr.io/jaime-project/jaime-front:$(VERSION)

docker-run r:
	podman run -it -p 8080:8080 ghcr.io/jaime-project/jaime-front:$(VERSION)

