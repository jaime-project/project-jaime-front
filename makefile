VERSION := 0.4.0

build b:
	docker build . -t ghcr.io/jaime-project/jaime-front:$(VERSION) --build-arg ARG_VERSION=$(VERSION)

run r:
	docker run -it -p 8080:8080 ghcr.io/jaime-project/jaime-front:$(VERSION)

push p:
	docker push ghcr.io/jaime-project/jaime-front:$(VERSION)
