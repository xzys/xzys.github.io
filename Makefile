.PHONY: build sync auto-orient

all: build


build:
	docker build -t sachin-site .
	docker run \
		--rm \
		--volume="$$PWD:/srv/jekyll" \
		-it \
		sachin-site


sync:
	rsync -azP --delete www/ aws1:www/sachin.rudraraju.xyz/


# auto orient photos
auto-orient-photos:
	for f in www/gallery/photography/*; do \
		echo $f; \
		mv "$f" "$f".bak; \
		convert -auto-orient "$f".bak "$f"; \
	done
