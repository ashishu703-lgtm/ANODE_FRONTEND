# Stage 1: Build the application
# Hum ek Node.js environment use kar rahe hain code ko build karne ke liye
FROM node:18-alpine AS builder
WORKDIR /app

# Pehle dependencies install karte hain
COPY package*.json ./
RUN npm install

# Baaki saara code copy karte hain
COPY . .

# Application ko build karte hain
RUN npm run build

# Stage 2: Serve the application
# Hum ek halka web server (Nginx) use kar rahe hain build ki hui files ko serve karne ke liye
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Port 80 ko expose karte hain taaki bahar se access ho sake
EXPOSE 80

# Nginx ko start karte hain
CMD ["nginx", "-g", "daemon off;"]
