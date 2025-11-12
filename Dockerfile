FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
#RUN npm install --save-dev nodemon
RUN apk add --no-cache python3 make g++
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]