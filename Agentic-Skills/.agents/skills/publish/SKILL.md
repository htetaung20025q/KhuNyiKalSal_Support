---
name: publish
description: >-
  Phase 9 of the SDLC Pipeline. Principal DevOps Engineer, Platform Engineer, and Production Deployment Architect.
  Generates production-ready, cloud-hardened deployment configurations using latest infrastructure versions
  (Docker 27+, Docker Compose v2.27+, Python 3.12-slim, PostgreSQL 16-alpine, Redis 7.2-alpine, Kubernetes 1.30+, Nginx 1.26+ with HTTP/2 & TLS 1.3)
  across Railway, Docker, Render, VPS (Ubuntu/Nginx/systemd), AWS (ECS Fargate/EC2), and Kubernetes. Ingests tested code from `/test`.
  Triggered via `/publish`, `/deploy`, or natural language requests for deployment and DevOps configuration.
---

# Multi-Platform Deployment & Publishing Engine (Universal DevOps Generator)

## SDLC Pipeline Integration
This skill represents **Phase 9 (Multi-Platform Deployment & Publishing)** in the 10-phase SDLC engineering operating system:
```text
[ /brainstorm ] ──► [ /analyze ] ──► [ /proj-init ] ──► [ /ui-ux ] ──► [ /design ] ──► [ /plan ] ──► [ /build ] ──► [ /test ] ──► [ /debug ] ──► [ /publish ]
```

- **Upstream Dependencies:**
  - **From [Phase 4: `/design`](../system-design/SKILL.md):** Ingests service topology, port bindings, database dependencies (PostgreSQL 16 / Redis 7.2), and environment variables.
  - **From [Phase 6: `/build`](../code-generation/SKILL.md) & [Phase 7: `/test`](../test/SKILL.md):** Ingests application codebase, entry points (`main.py`), dependencies (`requirements.txt`, `pubspec.yaml`), and passing test verification.
- **Downstream Handoff:** Produces complete, runnable infrastructure-as-code manifests, container definitions, web server configs, and deployment runbooks ready for production rollout.

---

## Modern Tech Stack & Container Standards (Latest Versions)

- **Container Engine:** Docker `27+` with multi-stage caching and non-root `USER appuser` execution.
- **Base Image:** `python:3.12-slim` (minimal attack surface, ~150MB total final image size).
- **Data Tier Images:** `postgres:16-alpine` (with healthcheck `pg_isready`) & `redis:7.2-alpine`.
- **Web Server & Reverse Proxy:** Nginx `1.26+` with HTTP/2, TLS 1.3, Brotli/Gzip compression, and SSE streaming headers.
- **Orchestration:** Kubernetes `1.30+` manifests (rolling updates, CPU/memory limits, readiness/liveness probes).
- **Cloud PaaS:** Railway CLI v3+ and Render Blueprint v2 (`render.yaml`).

---

## When to Use
- When deploying an application to cloud platforms (Railway, Render, AWS) or dedicated VPS Linux servers.
- When generating production Dockerfiles, `docker-compose.yml`, or Kubernetes manifests (`deployment.yaml`, `service.yaml`).
- When configuring Nginx reverse proxy, systemd services, UFW firewall rules, and SSL/TLS certificates on Linux.
- When the user runs `/publish` or `/deploy`.

---

## Command Format
```bash
/publish --platform <railway|docker|render|vps|aws|kubernetes> --project-name <name> [options]
```

### Supported Parameters

| Parameter | Type | Required? | Description & Allowed Values |
| :--- | :--- | :--- | :--- |
| `--platform` / `--target` | `enum` | **Yes** | Target environment: `railway`, `docker`, `render`, `vps`, `aws`, `kubernetes`, `all`. |
| `--project-name` / `--name` | `string` | **Yes** | Name of the project or service to publish. |
| `--port` | `integer` | No | Application runtime port (e.g., `8000`, `3000`, `5000`). Default: `8000`. |
| `--db` | `string` | No | Database dependency to configure (e.g., `postgresql`, `redis`, `sqlite`). |
| `--domain` | `string` | No | Custom domain or host (e.g., `api.fleettracker.io`). |

### Example Invocations
```bash
# Deploy FastAPI backend with Redis to Railway
/publish --platform railway --project-name "FleetTracker" --port 8000 --db "postgresql, redis"

# Generate Docker multi-stage build and docker-compose
/publish --platform docker --project-name "LogisticInventory" --port 8000 --db postgresql

# Generate Ubuntu VPS systemd + Nginx reverse proxy + UFW setup
/publish --platform vps --project-name "FleetTracker" --domain "api.fleettracker.io" --port 8000

# Generate Kubernetes manifests
/publish --platform kubernetes --project-name "FleetTracker" --port 8000
```

---

## Strict DevOps Engineering Rules

1. **Zero Code Modification**:
   - Do **NOT** modify business logic or application code.
   - Do **NOT** change system architecture.
   - ONLY generate deployment artifacts, manifests, Docker configs, and runtime scripts.
2. **Production Safety & Hardening**:
   - Zero hardcoded credentials or passwords (always use environment variables / secret managers).
   - Enforce non-root user execution inside Docker containers (`USER appuser`).
   - Implement health check endpoints (`GET /health` or `/api/v1/health`) in all service definitions.
   - Enforce explicit restart policies (`restart: unless-stopped` or Kubernetes `livenessProbe`).
3. **Stateless Service Architecture**:
   - Applications must bind to dynamic host ports (`$PORT` in Railway/Render or `8000` inside containers).
   - Ephemeral file storage inside containers; state stored exclusively in PostgreSQL 16 or object storage.

---

## Platform-Specific Manifest Requirements

### 1. 🚂 Railway
- `railway.json`: Deployment schema with builder config, replica scaling, and restart policy.
- `Procfile`: Dynamic port binding (e.g. `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4`).
- Environment variable mappings for managed PostgreSQL & Redis plugins.

### 2. 🐳 Docker
- `Dockerfile`: Multi-stage optimized build on `python:3.12-slim` (dependency caching layer, non-root user).
- `docker-compose.yml`: Multi-container topology (App + `postgres:16-alpine` + `redis:7.2-alpine`) with named persistent volumes and health checks.
- `.dockerignore`: Exclude `.git`, `__pycache__`, `.env`, tests, and virtual environments.

### 3. 🟢 Render
- `render.yaml`: Blueprint spec with `env: python`, build command, start command, and linked managed PostgreSQL disks.

### 4. 🖥️ VPS (Ubuntu 24.04 LTS / Linux)
- `/etc/systemd/system/[service].service`: Systemd unit file with automatic restart on crash (`Restart=always`), log forwarding to journald, and resource limits.
- `/etc/nginx/sites-available/[domain].conf`: Nginx 1.26 reverse proxy config with HTTP/2, TLS 1.3, Gzip compression, rate limiting, and websocket/SSE support.
- `deploy.sh`: Automated idempotent deployment bash script with zero downtime reload.

### 5. ☁️ AWS (ECS Fargate / EC2)
- AWS ECS Task Definition JSON (Fargate) with IAM execution roles and CloudWatch logging.
- Security Group rules (Inbound 80/443 to ALB, Inbound 8000 from ALB only).

### 6. ☸️ Kubernetes (1.30+)
- `deployment.yaml`: Rolling update strategy (`maxSurge: 1`, `maxUnavailable: 0`), CPU/Memory resource requests/limits, `livenessProbe`, `readinessProbe`.
- `service.yaml`: `ClusterIP` with target port mapping.
- `configmap.yaml` & `secret.yaml`: Decoupled configuration.
- `ingress.yaml`: Traefik / Nginx Ingress Controller routing with TLS annotations.

---

## Output Template

Generate output adhering strictly to this format:

```markdown
# Production Deployment & Publishing Plan: [Project Name]

## 1. Deployment Summary
- **Target Platform:** [Railway | Docker | Render | VPS | AWS | Kubernetes]
- **Runtime Model:** [Containerized Fargate / Monolithic VPS / PaaS Cloud]
- **Exposed Port & Protocol:** `[Port]` ([HTTP/1.1, HTTP/2, WebSockets/SSE])
- **Database & Cache Topology:** [Managed PostgreSQL 16 + Redis 7.2]

---

## 2. Environment Configuration (`.env.production`)

```env id="env-001"
# Environment Configuration
ENVIRONMENT=production
LOG_LEVEL=info
PORT=8000

# Database & Cache Connection Strings
DATABASE_URL=postgresql+asyncpg://user:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}/0

# Security & Secrets
SECRET_KEY=${APP_SECRET_KEY}
ALLOWED_ORIGINS=https://app.yourdomain.com
```

---

## 3. Container & Build Configurations

### File: `Dockerfile`
```dockerfile
# Multi-stage optimized production Dockerfile (Python 3.12-slim)
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
COPY --from=builder /root/.local /home/appuser/.local
COPY . .
RUN chown -R appuser:appgroup /app
USER appuser
ENV PATH=/home/appuser/.local/bin:$PATH
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

### File: `.dockerignore`
```text
.git
.gitignore
__pycache__
*.pyc
*.pyo
.env*
tests/
venv/
.agents/
```

### File: `docker-compose.yml`
```yaml
version: '3.8'
services:
  app:
    build: .
    restart: unless-stopped
    ports:
      - "8000:8000"
    env_file: .env.production
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: app_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d app_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7.2-alpine
    restart: unless-stopped
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

---

## 4. Platform-Specific Manifests

### File: `[railway.json | render.yaml | systemd.service | deployment.yaml]`
```text
# Platform manifest content
```

---

## 5. Networking, Reverse Proxy & Security Setup
- **Reverse Proxy:** Nginx 1.26 with HTTP/2 and gzip compression.
- **Firewall Rules (UFW):**
  ```bash
  sudo ufw default deny incoming
  sudo ufw default allow outgoing
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw enable
  ```
- **SSL / TLS Certificate:** Automated Let's Encrypt renewal (`certbot --nginx -d yourdomain.com`).

---

## 6. Step-by-Step Deployment Runbook
1. **Repository Setup:** Clone repo and configure production environment variables.
2. **Build Container / Service:** Execute build commands.
3. **Database Migration:** Run Alembic schema migrations: `alembic upgrade head`.
4. **Service Startup:** Start background workers and main web server.
5. **Health Verification:** Test endpoint: `curl -f https://yourdomain.com/health`.

---

## 7. Production Verification Checklist
- [x] All credentials stored in environment variables (zero hardcoded secrets).
- [x] Non-root user permissions active in container runtime (`USER appuser`).
- [x] Health check endpoint responding with `200 OK`.
- [x] Persistent volume mounts verified for PostgreSQL 16 data.
- [x] Restart policy active on crash (`unless-stopped` / systemd restart).
- [x] Structured logs streaming to stdout / journald.

---

## 8. Rollback Strategy & Failure Recovery
- **Zero-Downtime Rollback:** In case of failure, trigger immediate container rollback to previous image tag (`image:v1.0.2` &rarr; `image:v1.0.1`).
- **Database Downgrade:** Run `alembic downgrade -1` if migration was applied.
```

---

## Reference Example: Railway & Docker FleetTracker Deployment

### Command Invocation
```bash
/publish --platform railway --project-name "FleetTracker" --port 8000 --db "postgresql, redis"
```

### Generated Output

# Production Deployment & Publishing Plan: FleetTracker

## 1. Deployment Summary
- **Target Platform:** **Railway PaaS + Docker**
- **Runtime Model:** Multi-container stateless API with managed Railway PostgreSQL 16 & Redis 7.2
- **Exposed Port:** Binds dynamically to `$PORT` (defaults to `8000` locally)
- **Protocol:** HTTP/2 over TLS 1.3 with Server-Sent Events (SSE) streaming support

---

## 2. Environment Configuration

```env
ENVIRONMENT=production
LOG_LEVEL=info
PORT=8000
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
SECRET_KEY=${{SECRET_KEY}}
ALLOWED_ORIGINS=https://fleettracker.io,https://admin.fleettracker.io
```

---

## 3. Platform Configuration

### File: `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "numReplicas": 2,
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### File: `Dockerfile`
```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
COPY --from=builder /root/.local /home/appuser/.local
COPY . .
RUN chown -R appuser:appgroup /app
USER appuser
ENV PATH=/home/appuser/.local/bin:$PATH
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 4
```

---

## 4. Production Checklist & Verification
- [x] `railway.json` correctly binds to dynamic `$PORT`.
- [x] Multi-replica load balancing enabled (2 replicas).
- [x] Automated healthcheck configured at `/health`.
- [x] Non-root `appuser` running inside Docker.
- [x] Zero hardcoded database credentials.

---

## Reference Example 2: Kubernetes 1.30+ Deployment (FleetTracker)

### Command Invocation
```bash
/publish --platform kubernetes --project-name "FleetTracker" --port 8000
```

### Generated Output

# Production Deployment & Publishing Plan: FleetTracker (Kubernetes)

## 1. Deployment Summary
- **Target Platform:** Kubernetes 1.30+
- **Runtime Model:** Containerized stateless pods with rolling update strategy
- **Exposed Port:** 8000 (ClusterIP → Ingress Controller)
- **Database & Cache:** External managed PostgreSQL 16 + Redis 7.2 (not in-cluster)

---

## 2. Kubernetes Manifests

### File: `k8s/deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fleettracker-api
  labels:
    app: fleettracker
    component: api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: fleettracker
      component: api
  template:
    metadata:
      labels:
        app: fleettracker
        component: api
    spec:
      containers:
        - name: api
          image: fleettracker/api:latest
          ports:
            - containerPort: 8000
              protocol: TCP
          envFrom:
            - configMapRef:
                name: fleettracker-config
            - secretRef:
                name: fleettracker-secrets
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
            failureThreshold: 3
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 15
            periodSeconds: 20
            failureThreshold: 5
      terminationGracePeriodSeconds: 30
```

### File: `k8s/service.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: fleettracker-api-svc
spec:
  type: ClusterIP
  selector:
    app: fleettracker
    component: api
  ports:
    - port: 80
      targetPort: 8000
      protocol: TCP
```

### File: `k8s/ingress.yaml`
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: fleettracker-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.fleettracker.io
      secretName: fleettracker-tls
  rules:
    - host: api.fleettracker.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: fleettracker-api-svc
                port:
                  number: 80
```

### File: `k8s/configmap.yaml`
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fleettracker-config
data:
  ENVIRONMENT: "production"
  LOG_LEVEL: "info"
  PORT: "8000"
  ALLOWED_ORIGINS: "https://app.fleettracker.io"
```

### File: `k8s/secret.yaml`
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: fleettracker-secrets
type: Opaque
stringData:
  DATABASE_URL: "postgresql+asyncpg://user:${DB_PASSWORD}@db-host:5432/fleettracker"
  REDIS_URL: "redis://redis-host:6379/0"
  SECRET_KEY: "${APP_SECRET_KEY}"
```

---

## 3. Production Checklist
- [x] Rolling update with zero downtime (`maxSurge: 1`, `maxUnavailable: 0`)
- [x] Resource requests/limits prevent noisy neighbor issues
- [x] Readiness + liveness probes on `/health`
- [x] TLS 1.3 via cert-manager + Let's Encrypt
- [x] Secrets decoupled from ConfigMap

---

## Reference Example 3: VPS Deployment (Ubuntu 24.04 + Nginx + systemd)

### Command Invocation
```bash
/publish --platform vps --project-name "FleetTracker" --domain "api.fleettracker.io" --port 8000
```

### Generated Output

# Production Deployment & Publishing Plan: FleetTracker (VPS)

## 1. Deployment Summary
- **Target Platform:** Ubuntu 24.04 LTS VPS
- **Runtime Model:** systemd-managed Uvicorn process behind Nginx 1.26 reverse proxy
- **Domain:** `api.fleettracker.io` with automated Let's Encrypt TLS 1.3

---

## 2. systemd Service Unit

### File: `/etc/systemd/system/fleettracker.service`
```ini
[Unit]
Description=FleetTracker FastAPI Application
After=network.target postgresql.service redis.service
Wants=postgresql.service redis.service

[Service]
Type=exec
User=appuser
Group=appgroup
WorkingDirectory=/opt/fleettracker
EnvironmentFile=/opt/fleettracker/.env.production
ExecStart=/opt/fleettracker/venv/bin/uvicorn app.main:app \
    --host 127.0.0.1 \
    --port 8000 \
    --workers 4 \
    --access-log \
    --log-level info
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

---

## 3. Nginx Reverse Proxy Configuration

### File: `/etc/nginx/sites-available/api.fleettracker.io.conf`
```nginx
upstream fleettracker_backend {
    server 127.0.0.1:8000;
    keepalive 32;
}

server {
    listen 80;
    server_name api.fleettracker.io;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.fleettracker.io;

    # TLS 1.3 (managed by certbot)
    ssl_certificate /etc/letsencrypt/live/api.fleettracker.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.fleettracker.io/privkey.pem;
    ssl_protocols TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;

    # Compression
    gzip on;
    gzip_types application/json text/plain text/css;
    gzip_min_length 256;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/s;

    # SSE / WebSocket Support
    proxy_buffering off;
    proxy_cache off;

    location / {
        limit_req zone=api_limit burst=50 nodelay;

        proxy_pass http://fleettracker_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection '';
        proxy_http_version 1.1;

        # SSE long-lived connections
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }

    location /health {
        proxy_pass http://fleettracker_backend/health;
        access_log off;
    }
}
```

---

## 4. Automated Deployment Script

### File: `deploy.sh`
```bash
#!/bin/bash
set -euo pipefail

APP_DIR="/opt/fleettracker"
REPO_URL="git@github.com:org/fleettracker.git"
BRANCH="${1:-main}"

echo "🚀 Deploying FleetTracker ($BRANCH)..."

# Pull latest code
cd "$APP_DIR"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

# Install dependencies
source venv/bin/activate
pip install --no-cache-dir -r requirements.txt

# Run database migrations
alembic upgrade head

# Reload service (zero-downtime)
sudo systemctl reload fleettracker || sudo systemctl restart fleettracker

# Verify health
sleep 3
if curl -sf http://localhost:8000/health > /dev/null; then
    echo "✅ Deployment successful — health check passed"
else
    echo "❌ Health check failed — rolling back"
    git reset --hard HEAD~1
    sudo systemctl restart fleettracker
    exit 1
fi
```

---

## 5. Production Checklist
- [x] systemd `Restart=always` with 5s cooldown on crash
- [x] Nginx HTTP/2 + TLS 1.3 with `ssl_protocols TLSv1.3`
- [x] Rate limiting at 100 req/s with burst=50
- [x] SSE support via `proxy_buffering off`
- [x] Zero-downtime deployment with health check rollback
- [x] UFW firewall: only 22, 80, 443 open

