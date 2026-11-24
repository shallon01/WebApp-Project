
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t webapp-project:latest .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
                sh '''
                    docker stop webapp-container || true
                    docker rm webapp-container || true
                    docker run -d --name webapp-container -p 3001:3000 webapp-project:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Build, tests, and Docker deployment completed successfully!'
        }

        failure {
            echo 'Build, tests, or Docker deployment failed!'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
