# Step 1: Use an official Node.js runtime as a parent image
# We use a specific version for consistency, and '-alpine' is a lightweight version
FROM node:18-alpine

# Step 2: Set the working directory inside the container
# All subsequent commands will be run from this directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
# We copy these first to take advantage of Docker's layer caching.
# If these files don't change, Docker won't need to re-run 'npm install'.
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of your application's code into the working directory
COPY . .

# Step 6: Expose the port your application runs on
# Your server runs on port 8000
EXPOSE 8000

# Step 7: Define the command to run your application
# This is the command that will be executed when the container starts
CMD [ "node", "index.js" ]