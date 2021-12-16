IMAGE_NAME := brianwolf94/jaime-front:latest

docker-build db:
	docker build . -t $(IMAGE_NAME)

docker-run dr:
	docker run -it -p 80:80 $(IMAGE_NAME)

