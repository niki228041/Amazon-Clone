#!groovy
//  groovy Jenkinsfile
pipeline  {
    agent any;
    stages {
         stage("Change IP in axios.js")
         {
             steps{
                sh "sed  -i 's#http://localhost:5034#http://10.0.0.5:5034#g' FrontEnd/my-app/src/api/axios.js"
             }
         }
          stage("Change IP in appsettings.json")
         {
             steps{
                sh "sed  -i 's#http://localhost:81#http://10.0.0.5:81#g' BackEnd/Amazon-clone/ShopApi/appsettings.json"
             }
         }
        
        stage ("Remove all containers and images"){
             steps{
               sh'''#!/bin/sh 
            sudo /home/azureuser/delete.sh
 '''
            }
          }
        
        stage ("Run MSSQL container"){
            steps{
                sh 'docker run -v /home/db:/var/opt/mssql -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Qwerty-1" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest'
            }
        }
        stage("Create frontend docker image") {
            steps {
                echo 'Creating frontend docker image ...'
                sh " cd /var/lib/jenkins/workspace/Amazon-Clone/FrontEnd/my-app && docker build --no-cache -t alkaponees/amazon-clone-frontend   . "                
            }
        }
        stage("Create backend docker image") {
            steps {
                echo 'Creating backend docker image ...'
                sh " cd /var/lib/jenkins/workspace/Amazon-Clone/BackEnd/Amazon-clone/ && docker build --no-cache -t alkaponees/amazon-clone-backend  . "
            }
        }
        
        stage("docker login") {
            steps {
                echo " ============== docker login =================="
                withCredentials([usernamePassword(credentialsId: 'DockerHub-Credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                    docker login -u $USERNAME -p $PASSWORD
                    '''
                }
            }
        }
        stage("docker frontend run") {
             steps {
                 echo " ============== Creating frontend docker container =================="
                 sh '''
                 docker run -d --restart=always -p 81:80 --name=frontend alkaponees/amazon-clone-frontend
                 '''
             }
         }
        stage("docker backend run") {
             steps {
                 echo " ============== Creating backend docker container =================="
                 sh '''
                 docker run -d --restart=always -p 5034:5034 --name=backned alkaponees/amazon-clone-backend
                 '''
             }
        }
        
        stage("docker frontend push") {
            steps {
                echo " ============== pushing amazon-clone-frontend image =================="
                sh '''
                docker push alkaponees/amazon-clone-frontend
                '''
            }
        }
        stage("docker backend push") {
            steps {
                echo " ============== pushing amazon-clone-backend image =================="
                sh '''
                docker push alkaponees/amazon-clone-backend
                '''
            }
        }
        
    }
    post{
        always{
            
                echo "=========== Log out from Docker Hub =================="
                sh '''
                docker logout
                '''
        }
    }
}