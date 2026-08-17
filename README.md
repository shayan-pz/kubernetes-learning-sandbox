# Kubernetes Learning Sandbox ☸️

A hands-on Kubernetes sandbox designed to learn Kubernetes fundamentals and reproduce real-world Datadog observability and instrumentation scenarios.

This project demonstrates how to build, containerize, deploy, expose, scale, and troubleshoot a complete multi-service application using Docker and Kubernetes.

The sandbox was intentionally built from basic Kubernetes resources first so the underlying concepts are understood before moving to higher-level tools such as Helm and Datadog instrumentation.

---

# 🏗️ Architecture

```text
                    User 👤
                       │
                       ▼
                 Ingress 🚪
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   Frontend Service ☎️       Node.js Service ☎️
          │                         │
          ▼                         ▼
    Frontend Pod 🖥️          Node.js Pods 🔧
                                    │
                                    ▼
                             Python Service ☎️
                                    │
                                    ▼
                              Python Pod 🐍
                                    │
                                    ▼
                      Persistent Volume 💾
                          (optional)
```

Application request flow:

```text
Browser
   ↓
Frontend
   ↓
/api/process
   ↓
Ingress
   ↓
Node.js API
   ↓
Python Service
   ↓
JSON Response
```

---

# 📦 Components

| Component | Technology | Purpose |
|---|---|---|
| Frontend | HTML + JavaScript + Nginx | Provides the user interface |
| Backend API | Node.js + Express | Handles API requests and application logic |
| Processing Service | Python + Flask | Processes requests from the Node.js API |
| Containerization | Docker | Packages each application component |
| Orchestration | Kubernetes | Deploys and manages the containers |
| Networking | Kubernetes Services + Ingress | Handles internal and external communication |
| Configuration | ConfigMaps & Secrets | Provides runtime configuration |
| Health Monitoring | Liveness & Readiness Probes | Checks application health |
| Scaling | Horizontal Pod Autoscaler | Demonstrates automatic Pod scaling |
| Background Workloads | Jobs & CronJobs | Demonstrates one-time and scheduled workloads |
| Node Workloads | DaemonSets | Demonstrates workloads that run on eligible nodes |
| Storage | PV & PVC | Demonstrates persistent Kubernetes storage |
| Packaging | Helm | Packages Kubernetes resources into reusable charts |

---

# 📂 Project Structure

```text
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
```

---

# 📁 Repository Organization

The repository separates application code from Kubernetes infrastructure.

## Application Code

```text
frontend/
node-api/
python-service/
```

These folders contain:

- application source code
- dependencies
- Dockerfiles

## Kubernetes Infrastructure

```text
k8s/
```

This folder contains:

- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Jobs
- CronJobs
- DaemonSets
- PVs
- PVCs
- future Datadog resources

This separation keeps application development and infrastructure configuration organized independently.

---

# 💻 Prerequisites

Install:

- Docker Desktop
- Kubernetes enabled in Docker Desktop
- Docker CLI
- kubectl
- Git
- Helm

Verify:

```bash
docker --version
kubectl version --client
helm version
```

Confirm Kubernetes is running:

```bash
kubectl get nodes
```

The nodes should report:

```text
Ready
```

---

# 🐳 Build Docker Images

Docker images only need to be rebuilt when application code, dependencies, or Dockerfiles change.

## Python Service

```bash
docker build -t python-service:v2 ./python-service
docker tag python-service:v2 aliparvizi832/python-service:v2
docker push aliparvizi832/python-service:v2
```

## Node.js API

```bash
docker build -t node-api:v3 ./node-api
docker tag node-api:v3 aliparvizi832/node-api:v3
docker push aliparvizi832/node-api:v3
```

## Frontend

```bash
docker build -t frontend:v2 ./frontend
docker tag frontend:v2 aliparvizi832/frontend:v2
docker push aliparvizi832/frontend:v2
```

---

# ☸️ Deploy to Kubernetes

Apply the Python resources:

```bash
kubectl apply -f k8s/python-service/
```

Apply the Node.js resources:

```bash
kubectl apply -f k8s/node-api/
```

Apply the frontend resources:

```bash
kubectl apply -f k8s/frontend/
```

Apply shared Kubernetes resources:

```bash
kubectl apply -f k8s/config/
```

You can also apply everything recursively:

```bash
kubectl apply -R -f k8s/
```

---

# 🔍 Verify the Deployment

```bash
kubectl get deployments
kubectl get pods
kubectl get services
kubectl get ingress
kubectl get daemonsets
kubectl get jobs
kubectl get cronjobs
kubectl get pv
kubectl get pvc
```

Healthy application Pods should normally show:

```text
STATUS: Running
```

---

# 🌐 Access the Application

## Using Ingress

The application uses:

```text
http://myapp.local
```

Add this entry to `/etc/hosts` if needed:

```text
127.0.0.1 myapp.local
```

The Ingress routes:

```text
/
→ frontend

/api
→ node-api
```

The frontend sends requests to:

```text
/api/process
```

The Ingress rewrites the request so the Node.js application receives:

```text
/process
```

---

# 🌐 Using Port Forwarding

Frontend:

```bash
kubectl port-forward service/frontend 8080:80
```

Open:

```text
http://localhost:8080
```

Node.js API:

```bash
kubectl port-forward service/node-api 3000:3000
```

Test:

```bash
curl http://localhost:3000/process
```

Python service:

```bash
kubectl port-forward service/python-service 5000:5000
```

Test:

```bash
curl http://localhost:5000/process
```

---

# ▶️ Normal Sandbox Startup

You do not need to rebuild Docker images every time you use the sandbox.

For a normal session:

```bash
kubectl get nodes
kubectl get deployments
kubectl get pods
```

If everything is healthy, open:

```text
http://myapp.local
```

or use frontend port forwarding:

```bash
kubectl port-forward service/frontend 8080:80
```

Then open:

```text
http://localhost:8080
```

---

# 🧠 When to Rebuild vs Reapply

## Application code changed

Examples:

```text
server.js
app.py
index.html
Dockerfile
package.json
requirements.txt
```

Rebuild the appropriate Docker image.

```text
Code changed
   ↓
docker build
   ↓
docker push
   ↓
update Deployment image tag if required
   ↓
kubectl apply
```

## Kubernetes YAML changed

Examples:

```text
deployment.yaml
service.yaml
ingress.yaml
configmap.yaml
```

You normally only need:

```bash
kubectl apply -f <file-or-directory>
```

A Docker rebuild is not required.

---

# 📚 Kubernetes Concepts Covered

This project demonstrates:

- Docker
- Docker Hub
- Pods
- Deployments
- ReplicaSets
- Services
- Kubernetes DNS
- Ingress
- ConfigMaps
- Secrets
- Liveness Probes
- Readiness Probes
- Horizontal Pod Autoscaler
- Jobs
- CronJobs
- DaemonSets
- Persistent Volumes
- Persistent Volume Claims
- Kubernetes troubleshooting
- kubectl logs
- kubectl describe
- Helm fundamentals
- Helm Charts
- Helm templates
- `values.yaml`

---

# 📈 Datadog Learning Goals

This sandbox is designed to support future Datadog troubleshooting and instrumentation scenarios such as:

- Datadog Agent deployment
- Datadog Cluster Agent
- Kubernetes monitoring
- APM
- Distributed tracing
- RUM
- Unified Service Tagging
- Admission Controller
- Single Step Instrumentation
- Datadog Agent flares
- Kubernetes instrumentation troubleshooting

The `k8s/datadog/` directory is reserved for Datadog-specific Kubernetes resources as the project grows.

---

# 🔧 Troubleshooting Commands

Check Pods:

```bash
kubectl get pods
```

Inspect a Pod:

```bash
kubectl describe pod <pod-name>
```

Check application logs:

```bash
kubectl logs deployment/python-service
kubectl logs deployment/node-api
kubectl logs deployment/frontend
```

Check Ingress:

```bash
kubectl get ingress
kubectl describe ingress
```

Test the full backend path:

```bash
curl -i http://myapp.local/api/process
```

A healthy response should return JSON rather than an HTML error page.

---

# 🎯 Learning Objectives

After completing this project, you should understand:

- how Docker and Kubernetes work together
- how container images are built and deployed
- how Pods run containers
- how Deployments manage Pods
- how Services provide stable networking
- how Kubernetes DNS allows services to communicate
- how Ingress exposes applications
- how microservices communicate with each other
- how ConfigMaps and Secrets provide configuration
- how Kubernetes performs application health checks
- how applications can scale
- how Jobs and CronJobs work
- why DaemonSets are useful for node-level agents
- how persistent Kubernetes storage works
- how to troubleshoot failed Pods and requests
- how Helm simplifies Kubernetes deployments
- how the same sandbox can be used to reproduce Datadog issues

---

# 🚀 Future Improvements

Planned or possible extensions include:

- Datadog Agent deployment using Helm
- Datadog Cluster Agent
- APM instrumentation
- Distributed tracing
- RUM instrumentation
- Single Step Instrumentation
- Unified Service Tagging
- Datadog dashboards
- PostgreSQL
- HTTPS and TLS
- GitHub Actions
- Argo CD
- Terraform
- AWS EKS
- ROSA/OpenShift troubleshooting scenarios

---

# 👨‍💻 Purpose

This repository was created as a practical Kubernetes learning and troubleshooting sandbox.

Instead of immediately relying on Helm or managed tooling, the project starts with raw Kubernetes resources so the relationship between containers, Pods, Deployments, Services, networking, configuration, health checks, storage, and scaling can be understood clearly.

The same environment can then be extended with Helm and Datadog instrumentation to reproduce real-world Kubernetes observability issues in a controlled environment.

The goal is to build practical confidence with Kubernetes while providing a reusable environment for testing and troubleshooting Datadog-related scenarios.