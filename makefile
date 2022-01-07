IMAGE_NAME := brianwolf94/jaime-front:0.8.0

docker-build b:
	docker build . -t $(IMAGE_NAME)

docker-run r:
	docker run -it -p 80:80 $(IMAGE_NAME)

