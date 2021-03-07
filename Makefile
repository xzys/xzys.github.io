.PHONY: build build-uptime sync auto-orient

all: build


build: build-uptime build-portfolio


# ~syncing to bitbucket pages~ no custom domain support
# syncing to github pages [branch main]
sync-portfolio:
	set -e; BUILDDIR=$${TMPDIR}portfolio-www-`date '+%s'`; \
	git worktree add $$BUILDDIR main; \
	rsync -a --delete --exclude '.git*' www/ 										 $$BUILDDIR/; \
	rsync -a --delete --exclude '.git*' ext/uptime-status/build/ $$BUILDDIR/uptime/; \
	cp CNAME $$BUILDDIR/; \
	cd $$BUILDDIR; \
	git acp "`git-generate-commit-message`"; \
	cd -; \
	git worktree remove $$BUILDDIR --force


# github pages doesn't have CORS support, so using bb for uptime
# syncing to bb-pages [branch bb-pages]
sync-uptime:
	set -e; BUILDDIR=$${TMPDIR}uptime-www-`date '+%s'`; \
	git worktree add $$BUILDDIR bb-pages; \
	rsync -a --delete --exclude '.git*' ext/uptime-status/build/ $$BUILDDIR/; \
	cd $$BUILDDIR; \
	git acp "`git-generate-commit-message`"; \
	cd -; \
	git worktree remove $$BUILDDIR --force


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



# ========== portfolio ==========



build-portfolio:
	docker build -t sachin-site .
	docker run \
		--rm \
		--volume="$$PWD:/srv/jekyll" \
		-it \
		sachin-site


# auto orient photos
auto-orient-photos:
	for f in www/gallery/photography/*; do \
		echo $f; \
		mv "$f" "$f".bak; \
		convert -auto-orient "$f".bak "$f"; \
	done


