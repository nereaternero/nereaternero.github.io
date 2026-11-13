
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html ./
COPY pages/ ./pages/
COPY css/ ./css/
COPY js/ ./js/
COPY assets/ ./assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/ || exit 1

