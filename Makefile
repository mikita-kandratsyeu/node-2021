run:
	docker run -d -p 80:8080 --env-file .env --rm --name node-2021 m1kandratsyeu/node-2021
stop:
	docker stop node-2021
