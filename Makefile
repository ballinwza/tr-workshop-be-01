build-docker-image:
	docker build  -t tr-workshop-be-01 .

run-docker:
	docker run -p 8001:8000  -d tr-workshop-be-01