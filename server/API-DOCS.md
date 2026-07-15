# Cortex AI — API Documentation

> **Base URL:** `http://localhost:8000`


---

## `GET /`

Gateway health check.

**Response** `200 OK`

```json
{
  "message": "Gateway service is running"
}
```

---

## Authentication

### `GET /api/auth/test`

Testing service health check.

**Response** `200 OK`

```json
{
  "message": "Auth service is running"
}
```


### `POST /api/auth/signin`

Sign in or register a user using a Firebase ID token from Google OAuth. Creates a new user if one doesn't exist. Sets an `httpOnly` session cookie.

**Headers**

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |

**Request Body**

```json
{
  "token": "<Firebase ID Token>"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | `string` | Yes | Firebase ID token from `user.getIdToken()` after Google sign-in |

**Response — New User** `201 Created`

Sets cookie: `sessionID=<uuid>; HttpOnly; SameSite=Strict; Max-Age=86400000`

```json
{
  "message": "User Created successfully",
  "user": {
    "_id": "6697a1b2c3d4e5f6a7b8c9d0",
    "fireBaseId": "aBcDeFgHiJkLmNoPqRsT",
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "avatar": "https://lh3.googleusercontent.com/a/...",
    "createdAt": "2026-07-15T03:00:00.000Z",
    "updatedAt": "2026-07-15T03:00:00.000Z",
    "__v": 0
  }
}
```

**Response — Existing User** `200 OK`

Sets cookie: `sessionID=<uuid>; HttpOnly; SameSite=Strict; Max-Age=86400000`

```json
{
  "message": "User login successfully",
  "user": {
    "_id": "6697a1b2c3d4e5f6a7b8c9d0",
    "fireBaseId": "aBcDeFgHiJkLmNoPqRsT",
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "avatar": "https://lh3.googleusercontent.com/a/...",
    "createdAt": "2026-07-15T03:00:00.000Z",
    "updatedAt": "2026-07-15T03:00:00.000Z",
    "__v": 0
  }
}
```

**Errors**

| Status | Response | Cause |
|--------|----------|-------|
| `400` | `{ "error": "Invalid token" }` | Missing `token` in body |
| `400` | `{ "error": "Invalid user id" }` | Token has no `user_id` claim |
| `500` | `{ "error": "Internal server error" }` | Firebase / DB / Redis failure |

---

### `GET /api/auth/signout`

Sign out the current user by deleting their session from Redis.

**Cookies Required**

| Cookie | Description |
|--------|-------------|
| `sessionID` | Session UUID set during sign-in (sent automatically by browser) |

**Response** `200 OK`

```json
{
  "message": "User logout successfully"
}
```

**Errors**

| Status | Response | Cause |
|--------|----------|-------|
| `500` | `{ "error": "Internal server error" }` | Redis error |

---