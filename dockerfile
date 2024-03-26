FROM node
WORKDIR /dockersocial
COPY package*.json .
COPY . .
RUN npm install
RUN npm run style
ENV DB_NAME=socialm
ENV SECRET_KEY_SESSION=monza 
ENV PORT=8080
CMD [ "npm","start" ]
