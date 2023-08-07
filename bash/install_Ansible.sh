#!/bin/bash

# Update the package list
sudo apt-get update

# Install software-properties-common to use the add-apt-repository command
sudo apt-get install -y software-properties-common

# Add the Ansible repository to the system
sudo add-apt-repository -y ppa:ansible/ansible

# Update the package list to include Ansible
sudo apt-get update

# Install Ansible
sudo apt-get install -y ansible