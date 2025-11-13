FROM node:24-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
#RUN npm install --save-dev nodemon
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]