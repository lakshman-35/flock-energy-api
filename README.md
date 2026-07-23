# Flock Energy Assignment

REST API wrapper built around the legacy Urja Meter Operations Portal.

---

# Features

- Session-based authentication
- Automatic login
- Cookie persistence
- Meter listing
- Meter details
- Consumption history
- Swagger documentation
- OpenAPI Specification

---

# Technologies

- Node.js
- Express.js
- Axios
- axios-cookiejar-support
- tough-cookie
- Swagger UI
- swagger-jsdoc

---

# Installation

```bash
npm install
```

---

# Environment Variables

Create a `.env`

```
BASE_URL=https://urja-ops.flockenergy.tech

USERNAME=operator@urja.local

PASSWORD=urja-ops-2026
```

---

# Run

```bash
npm start
```

or

```bash
npm run dev
```

---

# Swagger

```
http://localhost:3000/docs
```

---

# API Endpoints

## Login

```
POST /api/v1/auth/login
```

---

## Get All Meters

```
GET /api/v1/meters
```

---

## Get Meter Details

```
GET /api/v1/meters/{id}
```

---

## Get Consumption History

```
GET /api/v1/meters/{id}/consumption
```

---

# Folder Structure

```
src
|
|--config
|--controllers
|--routes
|--services
|--swagger.js
|--app.js
```

---

# Design Decisions

- MVC Architecture
- Session-based authentication
- Automatic cookie management
- Clean REST wrapper over legacy APIs
- Data normalization before returning responses

---

# Future Improvements

- Auto session refresh on expiry
- Better logging
- Request caching
- Unit testing
- Docker support