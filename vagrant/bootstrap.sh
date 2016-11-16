#!/usr/bin/env bash

# set up nginx server
sudo service nginx start
echo Nginx started...
sudo cp /vagrant/vagrant/site.conf /etc/nginx/sites-available/site.conf
sudo chmod 644 /etc/nginx/sites-available/site.conf
sudo ln -s /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/site.conf
sudo rm -rf /etc/nginx/sites-available/default
sudo cp /vagrant/vagrant/nginx.conf /etc/nginx/nginx.conf
sudo chmod 644 /etc/nginx/nginx.conf
sudo service nginx restart
