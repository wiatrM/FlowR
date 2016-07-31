# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty32"

  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 1
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end

  # Add port-forward for Express app
  config.vm.network :forwarded_port, guest: 3000, host: 3000
  # Add port-forward for Livereload
  config.vm.network :forwarded_port, guest: 35729, host: 35729
  # Add port-forward for NGINX
  config.vm.network :forwarded_port, guest: 80, host: 80, auto_correct: true

  config.ssh.forward_agent = true

  config.vm.hostname = "flr"

  # provision file
  config.vm.provision "shell", path: "vagrant/provision.sh"
  config.vm.provision :shell, path: "vagrant/startup.sh", run: "always", privileged: true

  # enable GUI access for grunt fast develop
  # NOTE: comment this lines to connect via SSH
  config.vm.provider :virtualbox do |vb|
      #vb.gui = true
  end
end
