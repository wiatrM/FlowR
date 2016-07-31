#!/bin/bash

# Main provisioning
echo Setting up FlowR...
echo cd /vagrant >> /home/vagrant/.bashrc

# Prevent warnings: "dpkg-preconfigure: unable to re-open stdin ..."
export DEBIAN_FRONTEND=noninteractive

echo Updating repositories...
apt-get update -qq

echo Installing Unix build tools - needed for node-gyp to use make...
apt-get install -qq build-essential

echo Installing phantomjs dependency...
apt-get install -qq libicu48
apt-get install -qq apache2-utils

echo Installing git
apt-get install -qq git

#@TODO: uncomment or remove to PostgresSQL after choosing right DB
        # Import MongoDB public GPG key
        # http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
        #apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

        # Create a list file for MongoDB
        #echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

        #echo Installing Mongodb...
        #apt-get update
        #apt-get install mongodb-10gen
        #sudo apt-get install -y mongodb-org

echo Installing npm...
apt-get install -qq python-software-properties
echo Adding repository node.js...
apt-add-repository -y ppa:chris-lea/node.js
echo Updating repositories...
apt-get update -qq
echo Installing node.js
apt-get install -qq nodejs
# Note the new setup script name for Node.js v0.12
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
# Then install with:
sudo apt-get install -y nodejs

cd /vagrant

echo Installing Gulp/bower...
npm install gulp -g
npm install -g  bower phantomjs

echo Installing packages for FlowR...
npm install --no-bin-link

echo Installing Bower packages
sudo -H -u vagrant bower --config.interactive=false install -f

sudo mkdir -p /data/db

#install NGINX on top

sudo apt-get install -y nginx