#!/bin/bash

# Update the package list
sudo apt update

# Install Java Development Kit (JDK)
sudo apt install  fontconfig openjdk-11-jdk -y

# Add the Jenkins repository key
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key |  tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add the Jenkins repository to the system
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ |  tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update the package list to include Jenkins
sudo apt update

# Install Jenkins
sudo apt install -y jenkins

# Start the Jenkins service
sudo systemctl start jenkins

# Enable the Jenkins service to start on system startup
sudo systemctl enable jenkins

#Install apache
sudo apt update && sudo apt install -y nginx
# Update the package index
sudo apt update

# Install dependencies to allow apt to use a repository over HTTPS
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add the Docker repository to the system
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the package index again
sudo apt update

# Install Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add the current user to the docker group to run Docker commands without sudo
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | sudo grep 'tag_name' | sudo cut -d'"' -f4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


sudo mkdir /home/db
sudo chmod 777 /home/db
sudo docker run -v /home/db:/var/opt/mssql -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Qwerty-1" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest