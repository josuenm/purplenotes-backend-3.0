FROM node:16.15

RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "vim"]

WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./
RUN yarn

# bundle app source
COPY . .

CMD ["yarn", "dev"]