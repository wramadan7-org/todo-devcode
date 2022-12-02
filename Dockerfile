FROM node:16.18.1-alpine3.16
ENV NODE_ENV=production \
    NODE_PORT=3030 \
    MYSQL_DBDIALECT=mysql \
    MYSQL_HOST=localhost \
    MYSQL_PORT=3306 \
    MYSQL_USER=root \
    MYSQL_PASSWORD=rama2000 \
    MYSQL_DBNAME=wahyu_ramadan \
    PATH=$PATH:/usr/src/app/node_modules/.bin \
    API_URL=http://host.docker.internal:3030
WORKDIR /usr/src/app
COPY . .
RUN npm install --production
EXPOSE 3030
CMD ["npm", "start"]
