.PHONY: build sync

all: build

build:
	sass --style=expanded src/styles.sass:src/styles.css
	jekyll build -s src -d www 

sync:
	rsync -azP --delete www/ gce-i1:projects/sachin.rudraraju.xyz/
