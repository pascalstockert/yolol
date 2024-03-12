FROM node:fermium as build

WORKDIR /usr/local/yolol

COPY ./ /usr/local/yolol

RUN npm i

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/yolol/dist/yolol-v2 /usr/share/nginx/html

EXPOSE 80
