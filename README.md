# Kubernetes Learning Sandbox ☸️

A beginner-friendly Kubernetes sandbox that demonstrates how to build, containerize, deploy, and manage a complete multi-service application using Kubernetes from scratch.

This project was built as a hands-on learning environment to understand Kubernetes fundamentals before using higher-level tools like Helm or deploying production workloads such as the Datadog Agent.

By building everything manually first, you gain a solid understanding of how Kubernetes works behind the scenes before moving on to Helm templating and production deployment patterns.

---

# 🏗️ Architecture

                    User 👤
                       │
                       ▼
                 Ingress 🚪
                       │
                       ▼
              Frontend Service ☎️
                       │
                       ▼
                Frontend Pod 🖥️
                       │
                       ▼
               Node.js Service ☎️
                       │
                       ▼
                Node.js Pods 🔧
                       │
                       ▼
              Python Service ☎️
                       │
                       ▼
                 Python Pod 🐍
                       │
                       ▼
         Persistent Volume (optional) 💾
---

# 📦 Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | HTML + JavaScript + Nginx | User interface |
| Backend API | Node.js + Express | Business logic and API |
| Processing Service | Python + Flask | Handles processing requests |
| Containerization | Docker | Packages applications |
| Orchestration | Kubernetes | Deploys and manages containers |
| Networking | Kubernetes Services + Ingress | Internal and external communication |
| Configuration | ConfigMaps & Secrets | Application configuration |
| Storage | Persistent Volumes (PV) & Persistent Volume Claims (PVC) | Persistent application storage |
| Packaging | Helm | Kubernetes package manager |

---

# 📂 Project Structure

kubernetes-learning-sandbox/
│
├── frontend/
│   ├── index.html
│   └── Dockerfile
│
├── node-api/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── python-service/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── k8s/
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   │
│   ├── node-api/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── configmap.yaml
│   │   └── secret-example.yaml
│   │
│   ├── python-service/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   │
│   ├── config/
│   │   ├── ingress.yaml
│   │   ├── daemonset.yaml
│   │   ├── job.yaml
│   │   ├── cronjob.yaml
│   │   ├── persistent-volume.yaml
│   │   └── persistent-volume-claim.yaml
│   │
│   └── datadog/
│
├── docs/
│
├── helm/
│   └── demo-app/
│
├── README.md
└── .gitignore
---

# 📁 Repository Organization

The repository is intentionally divided into two major areas:

### Application Code

Contains the application source code and Dockerfiles.

- frontend/
- node-api/
- python-service/

### Kubernetes Infrastructure

Contains all Kubernetes resources required to deploy the application.

- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Jobs
- CronJobs
- DaemonSets
- Persistent Volumes
- Persistent Volume Claims

Separating application code from infrastructure makes the repository easier to maintain and mirrors how many production repositories are organized.

---

# 💻 Prerequisites

Install the following software before running the project:

- Docker Desktop
- Kubernetes (enabled in Docker Desktop)
- kubectl
- Docker CLI
- Git
- Helm (for the Helm section)

Verify the installation:

bash docker --version kubectl version --client helm version 

---

# 🐳 Build Docker Images

## Python Service

bash cd python-service  docker build -t python-service:v2 . docker tag python-service:v2 <dockerhub-username>/python-service:v2 docker push <dockerhub-username>/python-service:v2 

## Node.js API

bash cd ../node-api  docker build -t node-api:v3 . docker tag node-api:v3 <dockerhub-username>/node-api:v3 docker push <dockerhub-username>/node-api:v3 

## Frontend

bash cd ../frontend  docker build -t frontend:v2 . docker tag frontend:v2 <dockerhub-username>/frontend:v2 docker push <dockerhub-username>/frontend:v2 

---

# ☸️ Deploy to Kubernetes

Deploy the Python service:

bash kubectl apply -f k8s/python-service/ 

Deploy the Node.js API:

bash kubectl apply -f k8s/node-api/ 

Deploy the Frontend:

bash kubectl apply -f k8s/frontend/ 

Deploy shared Kubernetes resources:

bash kubectl apply -f k8s/config/ 

Deploy Datadog resources (when available):

bash kubectl apply -f k8s/datadog/ 

---

# 🔍 Verify Deployment

bash kubectl get deployments kubectl get pods kubectl get services kubectl get ingress kubectl get daemonsets kubectl get jobs kubectl get cronjobs kubectl get pv kubectl get pvc 

---

# 🌐 Access the Application

## Using Ingress

Open:

text http://myapp.local 

## Using Port Forwarding

bash kubectl port-forward service/frontend 8080:80  kubectl port-forward service/node-api 3000:3000 

Then open:

text http://localhost:8080 

---

# 📚 Kubernetes Concepts Covered

This project demonstrates:

- Docker
- Docker Hub
- Kubernetes Deployments
- Pods
- Services
- Ingress
- ConfigMaps
- Secrets
- Liveness Probes
- Readiness Probes
- Horizontal Pod Autoscaler (HPA)
- Jobs
- CronJobs
- DaemonSets
- Persistent Volumes (PV)
- Persistent Volume Claims (PVC)
- Helm
- Helm Charts
- Helm Templates
- values.yaml

---

# 📈 Datadog Topics Covered

The project also introduces Datadog concepts including:

- Datadog Agent
- DaemonSets
- Agent configuration
- Kubernetes monitoring
- Agent flares
- APM
- Distributed Tracing
- RUM
- Unified Service Tagging

---

# 🎯 Learning Objectives

After completing this project you should understand:

- How Docker and Kubernetes work together
- How container images are built and deployed
- How microservices communicate
- How Deployments keep applications running
- How Services provide stable networking
- How Ingress exposes applications
- How ConfigMaps and Secrets manage configuration
- How Kubernetes performs health checks
- How applications scale
- How background workloads run
- Why DaemonSets are used for monitoring
- How persistent storage works
- How Helm packages Kubernetes applications

---

# 🚀 Future Improvements

Potential future enhancements include:

- HTTPS with TLS certificates
- PostgreSQL deployment with persistent storage
- Full Datadog Agent deployment using Helm
- Datadog APM instrumentation
- Distributed Tracing
- Real User Monitoring (RUM)
- CI/CD using GitHub Actions
- GitOps using ArgoCD
- Monitoring dashboards
- Terraform infrastructure provisioning

---

# 👨‍💻 Purpose

This repository was created as a practical Kubernetes learning sandbox.

Instead of starting with Helm or managed tooling, every Kubernetes object is first created manually to build a strong understanding of how Kubernetes works internally.

Once the raw Kubernetes concepts are understood, the same application is packaged with Helm to demonstrate how production teams simplify deployments while still relying on the exact same Kubernetes resources underneath.

The goal is to build practical Kubernetes knowledge that can be applied to real-world DevOps, Platform Engineering, and Observability p