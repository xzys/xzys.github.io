FROM jekyll/jekyll

RUN \
  adduser -h /sass -s /sbin/nologin -D sass && \
  apk add --no-cache \
    dumb-init \
    libsass \
    sassc && \
  rm -f /tmp/* /etc/apk/cache/*

ADD entry.sh /bin/entry.sh
RUN chmod +x /bin/entry.sh

CMD ["/bin/entry.sh"]
