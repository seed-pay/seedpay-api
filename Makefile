.PHONY: dev prod

dev:
	docker compose \
		-f compose.yml \
		-f compose.dev.yml \
		down --remove-orphans
	docker compose \
		-f compose.yml \
		-f compose.dev.yml \
		build --no-cache
	docker compose \
		-f compose.yml \
		-f compose.dev.yml \
		up -d --force-recreate

prod:
	docker compose \
		-f compose.yml \
		-f compose.prod.yml \
		down --remove-orphans
	docker compose \
		-f compose.yml \
		-f compose.prod.yml \
		build --no-cache
	docker compose \
		-f compose.yml \
		-f compose.prod.yml \
		up -d --force-recreate
	docker image prune -f