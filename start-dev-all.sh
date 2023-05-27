#!/bin/sh
clear
echo "Starting Dev Setup"
docker-compose -f docker-compose-dev.yml up --d --build example-web-backend example-web-frontend
