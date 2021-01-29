.PHONY: build build-uptime sync auto-orient

all: build


build: build-uptime build-portfolio


sync: sync-uptime sync-portfolio



# ========== uptime monitor ==========


# uptime is synced to bb-pages
build-uptime:
	{ \
		set -ex; \
		cd ext/uptime-status; \
		docker build -t uptime-status .; \
		docker run \
			--rm \
			--volume="$$PWD:/root/build" \
			-it \
			uptime-status; \
	}



sync-uptime:
	set -e; BUILDDIR=$${TMPDIR}portfolio-www-`date '+%s'`; \
	git worktree add $$BUILDDIR bb-pages; \
	rsync -a --delete --exclude '.git*' ext/uptime-status/build/ $$BUILDDIR/; \
	cd $$BUILDDIR; \
	git acp "`git-generate-commit-message`"; \
	cd -; \
	git worktree remove $$BUILDDIR --force



# ========== portfolio ==========



build-portfolio:
	docker build -t sachin-site .
	docker run \
		--rm \
		--volume="$$PWD:/srv/jekyll" \
		-it \
		sachin-site


sync-portfolio:
	rsync -azP --delete www/ aws1:www/sachin.rudraraju.xyz/


# auto orient photos
auto-orient-photos:
	for f in www/gallery/photography/*; do \
		echo $f; \
		mv "$f" "$f".bak; \
		convert -auto-orient "$f".bak "$f"; \
	done
