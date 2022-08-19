VERSION := 1.6.2

docker-build b:
	podman build . -t brianwolf94/jaime-front:$(VERSION)

docker-run r:
	podman run -it -p 80:80 brianwolf94/jaime-front:$(VERSION)

