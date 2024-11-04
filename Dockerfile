# Use Node.js base image
FROM node:18-alpine

# Install git
RUN apk add --no-cache git

# Set working directory
WORKDIR /learn-ecl

# Copy package files
COPY package.json ./ 
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 8000

# Start the app
CMD ["npm", "serve"]