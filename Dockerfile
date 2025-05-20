FROM denoland/deno:2.3.3

EXPOSE 3000

WORKDIR /app

COPY . .

RUN deno run -A --node-modules-dir npm:vite build

CMD ["deno", "run", "--allow-net", "--allow-read", "jsr:@std/http@1/file-server", "dist/", "--port", "3000"]