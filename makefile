IMAGE_NAME := brianwolf94/jaime-front:0.1.0

docker-build db:
	docker build . -t $(IMAGE_NAME)

docker-run dr:
	docker run -it -p 80:80 $(IMAGE_NAME)

