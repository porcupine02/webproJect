pipeline {
    agent any

    environment {
        // Define variables
        DOCKER_CREDENTIALS = credentials('dockerhub')
        BACKEND_IMAGE = 'fern018/backend:latest'
        FRONTEND_IMAGE = 'fern018/frontend:latest'
    }


    stages {
        stage('Check Docker') {
            steps {
                script {
                    def dockerExists = sh(script: 'docker --version', returnStatus: true) == 0
                    if (!dockerExists) {
                        sh 'curl -fsSL https://get.docker.com | sh'
                    }
                }
            }
        }
        // stage('Check Docker Compose') {
        //     steps {
        //         script {
        //             def dockerComposeExists = sh(script: 'docker-compose --version', returnStatus: true) == 0
        //             if (!dockerComposeExists) {
        //                 sh 'sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
        //                 sh 'sudo chmod +x /usr/local/bin/docker-compose'
        //             }
        //         }
        //     }
        // }

        // stage('Check Docker Compose') {
        //     steps {
        //         script {
        //             def dockerComposeExists = sh(script: 'docker compose version', returnStatus: true) == 0
        //             if (!dockerComposeExists) {
        //                 // sh 'sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
        //                 sh 'sudo chmod +x /usr/local/bin/docker-compose'
        //             }
        //         }
        //     }
        // }

        stage('Build and Push Docker Images') {
                    steps {
                        // Backend container
                        dir('./backend/') {
                            script {
                                // Define Docker image name

                                sh 'echo start build the Docker image = $DOCKER_IMAGE'
                                // Build the Docker image
                                sh 'docker build -t $BACKEND_IMAGE .'
                    
                                // Login to Docker Hub
                                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'

                                // Push the Docker image to Docker Hub
                                sh "docker push $BACKEND_IMAGE"
                            }
                        }

                        // Frontend container
                        dir('./frontend/') {
                            script {

                                // Build the Docker image
                                sh 'docker build -t $FRONTEND_IMAGE .'

                                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'

                                // Push the Docker image to Docker Hub
                                sh "docker push $FRONTEND_IMAGE"
                            }
                        }
                    }
                }

        stage('Deploy') {
                    steps {
                        // Pull the Docker images from Docker Hub and run the containers using docker-compose
                        dir('./') {
                            script {
                                // Pull Docker images from Docker Hub
                                sh 'docker-compose pull'
                                // sh 'docker push fern018/frontend'
                                // sh 'docker push fern018/backend'

                                // // Run Docker containers using docker-compose
                                sh 'docker-compose up -d'
                            }
                        }
                    }
        }
    }
}
