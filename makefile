VERSION := 1.3.0

docker-build b:
	docker build . -t brianwolf94/jaime-front:$(VERSION)

docker-run r:
	docker run -it -p 80:80 brianwolf94/jaime-front:$(VERSION)

