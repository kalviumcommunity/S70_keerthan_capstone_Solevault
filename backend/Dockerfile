# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of your application's code
# The .dockerignore file will prevent copying node_modules, .env, etc.
COPY . .

# --- NEW: SECURITY BEST PRACTICE - Create and use a non-root user ---
# Create a new user 'node' within a new group 'node'
RUN addgroup -S node && adduser -S node -G node
# Change ownership of the app directory to the new user
RUN chown -R node:node /usr/src/app
# Switch to the non-root user
USER node
# --- END NEW SECURITY STEPS ---

# Step 6: Expose the port your application runs on
EXPOSE 8000

# Step 7: Define the command to run your application
CMD [ "node", "index.js" ]