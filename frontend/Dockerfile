#
# STAGE 1: Build.
#

# Base image.
FROM node:alpine

RUN mkdir -p /usr/frontend

WORKDIR /usr/frontend

# Installing dependencies.
COPY ./package*.json /usr/frontend/
RUN npm install
RUN npm update

# Copy source into image.
COPY ./ /usr/frontend/

# Building app.
RUN npm run-script build-all

#
# STAGE 2: Setup.
#

FROM nginx:alpine

# Removing nginx default page.
RUN rm -rf /usr/share/nginx/html/*

# Copying nginx configuration.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copying source into web server root.
COPY --from=0 /usr/frontend/dist/frontend /usr/share/nginx/html
