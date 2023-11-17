FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY nodemon.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . . 
RUN npm install
RUN npm install -g nodemon
RUN npx prisma generate
EXPOSE 3000
CMD [ "npm", "start" ]