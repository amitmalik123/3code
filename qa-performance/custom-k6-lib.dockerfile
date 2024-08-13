FROM grafana/xk6:0.9.2 as builder

WORKDIR /app

RUN xk6 build v0.47.0 --output /app/k6  \
    --with github.com/Dynatrace/xk6-output-dynatrace@937e4bf7ebe93754a923b58cb573917b201f15df \
    --with github.com/grafana/xk6-dashboard@v0.6.1


FROM alpine:3.18

USER root

RUN apk add --no-cache ca-certificates && \
    adduser -D -u 12345 -g 12345 k6

COPY --from=builder /app/k6 /usr/bin/k6

RUN apk --no-cache add chromium-swiftshader

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

ENV K6_BROWSER_HEADLESS=true
# no-sandbox chrome arg is required to run chrome browser in
# alpine and avoids the usage of SYS_ADMIN Docker capability
ENV K6_BROWSER_ARGS=no-sandbox

WORKDIR /home/k6

USER k6

ENTRYPOINT ["k6"]