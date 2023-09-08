#!/bin/bash
container_name="backup"
if docker ps -a --format "{{.Names}}" | grep -q "^$container_name$"; then
# Container exists, execute your command here
sudo docker cp  backend:/app/comment_images /home/azureuser/backup/  
sudo docker cp  backend:/app/company_images /home/azureuser/backup/
sudo docker cp  backend:/app/images /home/azureuser/backup/ 
sudo docker cp  backend:/app/music_files /home/azureuser/backup/  
sudo docker cp  backend:/app/music_images /home/azureuser/backup/ 
else
# Container does not exist
echo "Container '$container_name' does not exist."
fi