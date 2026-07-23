# PROTOCOL.md

# Flock Energy Assignment – Protocol Discovery

## 1. Authentication Workflow

### Login Endpoint

```
POST /login
```

### Request Headers

```
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Origin: https://urja-ops.flockenergy.tech
Referer: https://urja-ops.flockenergy.tech/login
x-sveltekit-action: true
```

### Request Body

```
email=operator@urja.local
password=urja-ops-2026
```

### Login Response

```
HTTP 200
{
    "type":"redirect",
    "status":303,
    "location":"/meters"
}
```

### Authentication Method

Authentication is session-based.

After successful login the server returns

```
__Secure-better-auth.session_token
```

This cookie is used for all future requests.

---

# Session Management

The application stores cookies using

- axios-cookiejar-support
- tough-cookie CookieJar

The session is automatically reused for every request.

If login has already been performed, the client does not authenticate again.

---

# Internal Endpoints

## Login

```
POST /login
```

Purpose

Authenticate user.

---

## Meter Search

```
GET /portal/meters/search
```

Query Parameters

```
page
q
```

Returns

- meter list
- pagination information

---

## Meter Geo Location

```
GET /portal/meters/{meterId}/geo
```

Returns

```
latitude
longitude
```

---

## Meter Energy

```
GET /portal/meters/{meterId}/energy
```

Returns

Time-series consumption information including

- timestamp
- kwh
- kvah
- voltR

---

# Data Normalization

Energy values originally arrive as strings.

Example

Before

```
"kwh":"42594.05"
```

After

```
42594.05
```

Similarly

```
kvah
voltR
```

are converted into numeric values.

---

# Observations

- Authentication uses session cookies instead of JWT.
- Login redirects to `/meters`.
- Meter list is returned as JSON.
- Geo endpoint returns GPS coordinates.
- Energy endpoint returns half-hourly readings.
- Cookie expiration is approximately one hour.