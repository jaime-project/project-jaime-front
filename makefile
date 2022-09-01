VERSION := 1.7.6

build b:
	podman build . -t ghcr.io/jaime-project/jaime-front:$(VERSION)

run r:
	podman run -it -p 8080:8080 ghcr.io/jaime-project/jaime-front:$(VERSION)

push p:
	podman push ghcr.io/jaime-project/jaime-front:$(VERSION)
