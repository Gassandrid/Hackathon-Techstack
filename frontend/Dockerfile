# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build and expose the app
RUN npm run build
EXPOSE 5173

# Start the application
CMD ["npm", "run", "preview"]
