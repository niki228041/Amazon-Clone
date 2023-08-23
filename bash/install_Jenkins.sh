#!/bin/bash

# Update the package list
sudo apt update && sudo apt install nginx -y

sudo apt update && sudo snap install certbot --classic

sudo apt update

# Install Java Development Kit (JDK)
sudo apt install  fontconfig openjdk-11-jdk -y

# Add the Jenkins repository key
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add the Jenkins repository to the system
 echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update the package list to include Jenkins
sudo apt update

# Install Jenkins
sudo apt install -y jenkins

# Start the Jenkins service
sudo systemctl start jenkins

# Enable the Jenkins service to start on system startup
sudo systemctl enable jenkins
