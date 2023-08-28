#!/bin/bash

# Update the package list
apt update

# Install Java Development Kit (JDK)
apt install  fontconfig openjdk-11-jdk -y

# Add the Jenkins repository key
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key |  tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add the Jenkins repository to the system
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ |  tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update the package list to include Jenkins
apt update

# Install Jenkins
apt install -y jenkins

# Start the Jenkins service
systemctl start jenkins

# Enable the Jenkins service to start on system startup
systemctl enable jenkins

#Install apache
apt update && apt install -y nginx