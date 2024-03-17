# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .


# Build the frontend code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Define the command to serve the production build of the frontend
CMD ["npm", "run", "preview"]
