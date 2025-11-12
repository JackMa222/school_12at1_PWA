FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
#RUN npm install --save-dev nodemon
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]