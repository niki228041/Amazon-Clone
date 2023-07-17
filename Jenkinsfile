#!groovy
//  groovy Jenkinsfile
pipeline  {
    agent any;
    stages {
        stage("Change IP in configs")
        {
            steps{
                sh "cd .. && find Amazon-Clone/ -type f -exec sed  -i 's/localhost/0.0.0.0/g' {} +"
            }
        } 
        stage("Create frontend docker image") {
            steps {
                echo 'Creating docker image ...'
                    sh " cd /var/lib/jenkins/workspace/Amazon-Clone/FrontEnd/my-app && docker build --no-cache -t alkaponees/amazon-clone-frontend   . "                
            }
        }
        stage("Create backend docker image") {
            steps {
                echo 'Creating docker image ...'
                dir('.'){
                    sh " cd /var/lib/jenkins/workspace/Amazon-Clone/BackEnd/Amazon-clone/ && docker build --no-cache -t alkaponees/amazon-clone-backend  . "
                }
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
        
        stage("docker push") {
            steps {
                echo " ============== pushing image =================="
                sh '''
                docker push alkaponees/amazon-clone-frontend
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