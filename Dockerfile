#docker build . -t app-image --build-arg BUILD=true
# Stage 1 - Conditionally download and install dependencies 
FROM node:12
WORKDIR /app
COPY . ./
ARG BUILD=false
RUN if [ "$BUILD" = "true" ] ; then npm install ; else echo "Skipping npm install" ; fi
EXPOSE 4000
CMD ["npm", "start"]
