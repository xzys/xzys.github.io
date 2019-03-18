#!/bin/sh
pwd
set -x
sassc --style=expanded src/styles.sass src/styles.css
rm -rf www
jekyll build -s $PWD/src -d $PWD/www
