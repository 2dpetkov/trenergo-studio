FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# For production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
