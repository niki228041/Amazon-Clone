#!/bin/bash
cd /home/azureuser/Amazon-CLone/BackEnd/Amazon-clone
git pull
dotnet sonarscanner begin /k:"Amazon-Clone" /d:sonar.host.url="http://localhost:9000"  /d:sonar.login="##############"
dotnet build
dotnet sonarscanner end /d:sonar.login="##############"
sudo systemctl stop sonarqube