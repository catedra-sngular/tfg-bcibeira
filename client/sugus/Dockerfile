FROM nginx
WORKDIR /usr/share/share

RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

COPY sugus/package.json ./

RUN npm install

COPY sugus/ ./

RUN npm run build

RUN rm -r /usr/share/nginx/html/*

RUN cp -a build/. /usr/share/nginx/html