.PHONY: dev prod

dev:
	docker compose \
		-f compose.yml \
		-f compose.dev.yml \
		up -d --build

prod:
	docker compose \
		-f compose.yml \
		-f compose.prod.yml \
		up -d --build