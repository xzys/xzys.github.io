.PHONY: build

all: build

build:
	sass --style=expanded src/styles.sass:src/styles.css
	jekyll build -s src -d www 
