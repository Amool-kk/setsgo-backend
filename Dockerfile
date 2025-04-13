# Use official Node.js 18 image
FROM node:18

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies — use full install if it's not production-only
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port your app runs on
EXPOSE 8000

# Define default command to run your app
CMD ["node", "src/index.js"]
