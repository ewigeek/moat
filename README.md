# MOAT - My Own Activities Tracker (Early Development)

A personal habit and activity tracking application.

## Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Backend  | Spring Boot 4, Java 25, Gradle                  |
| Frontend | Angular 22, Angular Material                    |
| Auth     | Keycloak 26.7.0 (OAuth2)                        |
| Database | PostgreSQL 18, Flyway, JPA/Hibernate, MapStruct |
| Dev      | Dev container (Ubuntu), Docker Compose          |

---

## Running the project

### Prerequisites

- Docker + Docker Compose
- Dev container support (VS Code + Dev Containers extension, or compatible IDE)

### Copy env file

```bash
cp .env.example .env
```

### Start infrastructure

```bash
docker compose up -d
```

### Start backend (inside devcontainer; from `server` directory)

```bash
gradlew bootRun
```

### Start frontend (inside devcontainer; from `client` directory)

```bash
ng serve
```

### Ports

| Service            | URL                                         |
| ------------------ | ------------------------------------------- |
| Angular dev server | http://localhost:4200                       |
| Spring Boot API    | http://localhost:8081                       |
| Swagger UI         | http://localhost:8081/swagger-ui/index.html |
| Keycloak admin     | http://keycloak:8080/admin                  |

### `/etc/hosts` entry required on the host machine

```
127.0.0.1 keycloak
```

This is needed because both the browser and the Spring Boot resource server must resolve the same Keycloak issuer URL. Without it, token validation will fail.

---

## Keycloak Setup

Keycloak runs on `http://keycloak:8080`. Admin credentials are defined in `docker-compose.yml`.

After starting the infrastructure, open the admin console and follow the steps below.

### 1. Create a realm

- Open **Keycloak Admin Console** → `http://keycloak:8080/admin`
- Navigate to **Manage Realms** → **Create realm**
- **Realm name:** `moat`
- Click **Create**

### 2. Create a client

Navigate to **Clients** → **Create client**.

**General settings tab:**

- **Client type:** OpenID Connect
- **Client ID:** `moat-client`
- **Capability config tab:**
  - **Client authentication:** OFF (public client required for PKCE)
  - **Authorization** OFF
  - **Authentication flow:** ✅ Standard flow only (uncheck everything else)
  - **Direct access grants:** ON ⚠️ temporary workaround for Swagger UI; to be replaced with Authorization Code + PKCE flow

**Login settings tab:**

- **Valid redirect URIs:** `http://localhost:4200/*`, `http://localhost:8081/swagger-ui/*`
- **Valid post logout redirect URIs:** `http://localhost:4200/*`
- **Web origins:** `http://localhost:4200`, `http://localhost:8081`
  Click **Save**.

### 3. Create a test user

Navigate to **Users** → **Create new user**.

- **Username:** (anything, e.g. `testuser`)
- **Email verified:** ON
- Click **Create**, then go to the **Credentials** tab:
- Click **Set password**
- Enter a password
- **Temporary:** OFF
- Click **Save**.

---

## Architecture notes

### Authentication flow

1. Angular app initializes → Keycloak redirects to login if not authenticated (`onLoad: 'login-required'`)
2. After login, Keycloak issues an access token (JWT)
3. `includeBearerTokenInterceptor` automatically attaches the token to all requests matching `environment.apiUrl`
4. Spring Boot validates the JWT against Keycloak's JWKS endpoint
5. `UserService.resolveUserId(Jwt jwt)` maps the Keycloak subject claim (`sub`) to an internal user UUID, creating the user on first login

### Vertical Slice Architecture (backend)

Each feature lives in its own package under `feature/`:

```
feature/
├── user/           - User entity, auto-created on first login
├── activity/       - Activity CRUD
└── activityrecord/ - Activity record CRUD (log entries per activity)
```

Shared infrastructure (exception handling, security config) lives in `shared/`.

---

## API overview

All endpoints require a valid Bearer token.

### Activities

| Method | Path                   | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | `/api/activities`      | Create activity     |
| GET    | `/api/activities`      | List all activities |
| GET    | `/api/activities/{id}` | Get activity by ID  |
| DELETE | `/api/activities/{id}` | Delete activity     |

### Activity Records

| Method | Path                         | Description            |
| ------ | ---------------------------- | ---------------------- |
| POST   | `/api/activity-records`      | Log an activity record |
| GET    | `/api/activity-records`      | List all records       |
| GET    | `/api/activity-records/{id}` | Get record by ID       |
| DELETE | `/api/activity-records/{id}` | Delete record          |

---

## Project status

Early development. Implemented so far:

- [x] User, Activity, ActivityRecord backend slices (entity, repo, service, controller, DTOs, MapStruct, Flyway migrations)
- [x] Global exception handling
- [x] Angular frontend shell (sidebar nav, routing)
- [x] NgRx SignalStore for Activity and ActivityRecord
- [x] Keycloak integration (login-required, auto token refresh, bearer interceptor)
- [x] Angular Material tables with create dialogs
- [ ] Custom dialog form fields (design agreed, not yet implemented)
- [ ] Delete action wiring (button exists, handler not connected)
- [ ] Activity statistics cards
- [ ] Configure Swagger UI to use Authorization Code + PKCE flow (currently using Direct Access Grants as a workaround)
- [ ] AI service (Python / FastAPI + Ollama)
