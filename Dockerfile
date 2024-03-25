FROM node:20
WORKDIR /usr/src/app
COPY package.json .
COPY prisma ./prisma/
RUN npm install
COPY . .
EXPOSE 10001
# CMD ["npm", "run", "dev"]

# Copy and allow running migrate-and-start.sh script
COPY migrate-and-start.sh ./
RUN chmod +x migrate-and-start.sh

# Execute the script
CMD ["./migrate-and-start.sh"]