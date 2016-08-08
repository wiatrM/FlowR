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

echo Installing git...
apt-get install -qq git

echo Installing PostgreSQL...
apt-get install -qq postgresql postgresql-contrib

echo Configuring PostgreSQL...
sudo -u postgres createuser vagrant -s
sudo -u postgres createdb vagrant
echo "host all  all    all  trust" >> /etc/postgresql/9.3/main/pg_hba.conf
echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf
sudo service postgresql restart

echo Installing node 6.x...
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

cd /vagrant

echo Installing Gulp/bower...
npm install gulp -g
npm install -g bower
echo Installing strongloop...
npm install -g strongloop
npm install -g nsp

echo Installing packages for FlowR...
npm install --no-bin-link

echo Installing Bower packages
sudo -H -u vagrant bower --config.interactive=false install -f

# Install NGINX on top

echo Installing nginx...
sudo apt-get install -y nginx
