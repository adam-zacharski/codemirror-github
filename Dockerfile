FROM node:0.10.36

ADD package.json /src/

WORKDIR /src/

RUN npm install

ADD . /src/

CMD node server.js