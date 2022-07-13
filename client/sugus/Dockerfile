FROM node:16.16.0-alpine3.16
COPY ./sugus .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
