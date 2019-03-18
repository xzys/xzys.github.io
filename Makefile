.PHONY: build sync

all: build

build:
	docker build -t sachin-site .
	docker run \
		--rm \
		--volume="$$PWD:/srv/jekyll" \
		-it \
		sachin-site
	

sync:
	rsync -azP --delete www/ gce-i1:projects/sachin.rudraraju.xyz/

