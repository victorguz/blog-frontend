## Use Node Slim image
FROM node:18-slim
## Copy source code
COPY . .
## Start the application
CMD ["node", "dist/angular-ssr-docker/server/main.js"]
