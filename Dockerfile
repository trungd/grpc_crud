FROM node:4-onbuild
# replace this with your application's default port
EXPOSE 3000
WORKDIR /usr/src/app
COPY ./package.json /usr/scr/app/package.json
RUN npm install