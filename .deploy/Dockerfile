# ------------------------------
# 1) Builder
# ------------------------------
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# ------------------------------
# 2) Runner
# ------------------------------
FROM nginx:alpine
COPY .deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]''
