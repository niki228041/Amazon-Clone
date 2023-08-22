#!groovy
//  groovy Jenkinsfile
pipeline  {
    agent any;
    stages {
         stage("Change IP in axios.js")
         {
             steps{
                sh "sed  -i 's#localhost:5034#amazonclone.monster/api#g' FrontEnd/my-app/src/api/axios.js"
             }
         }
          stage("Change IP in appsettings.json")
         {
             steps{
                sh "sed  -i 's#localhost:81#amazonclone.monster/#g' BackEnd/Amazon-clone/ShopApi/appsettings.json"
             }
         }
//          stage ("Remove all containers and images"){
//             steps{
//                sh'''#!/bin/sh 
//            /var/lib/jenkins/delete.sh
// '''
//             }
//          }
         
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
        // stage("docker frontend run") {
        //     steps {
        //         echo " ============== Creating frontend docker container =================="
        //         sh '''
        //         docker run -d --restart=always -p 80:80 alkaponees/amazon-clone-frontend
        //         '''
        //     }
        // }
        //  stage("docker backend run") {
        //     steps {
        //         echo " ============== Creating backend docker container =================="
        //         sh '''
        //         docker run -d --restart=always -p 5034:5034 alkaponees/amazon-clone-backend
        //         '''
        //     }
        // }
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