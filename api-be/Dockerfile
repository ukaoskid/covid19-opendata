#
# STAGE 1: Build.
#

# Base image.
FROM node:alpine

RUN mkdir -p /usr/api-be/

WORKDIR /usr/api-be/
COPY package*.json /usr/api-be/
RUN npm install

# Copy source into image.
COPY ./ /usr/api-be/

# Exposing ports.
EXPOSE 3000
