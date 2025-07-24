# Backend API - Secure Login System

## Overview
This backend provides secure user authentication and session persistence using Node.js, Express, MongoDB, and JWTs. It supports account creation, login, logout, and a 'remember me' feature for persistent sessions.

## Features
- Secure password hashing with bcrypt
- JWT-based authentication
- 'Remember me' option for extended login sessions
- Stateless logout
- Clean, production-ready code

## Dependencies
- express
- mongoose
- bcrypt
- jsonwebtoken
- dotenv
- cors

Install dependencies:
```bash
cd backend
npm install
```

## Environment Variables
Create a `.env` file in the backend directory with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000 # optional, defaults to 5000
```

## API Endpoints
### POST /api/auth/signup
Register a new user. Request body:
```
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "yourpassword",
  "role": "customer" | "shopkeeper", // optional, default: customer
  "location": "Shop Address" // required for shopkeeper
}
```

### POST /api/auth/login
Login with credentials. Request body:
```
{
  "email": "user@example.com",
  "password": "yourpassword",
  "rememberMe": true // optional, extends session to 7 days
}
```
- Returns a JWT token and expiry. If `rememberMe` is true, token lasts 7 days; otherwise, 1 hour.

### POST /api/auth/logout
Stateless logout. Instructs client to remove the JWT token.

### GET /api/auth/me
Get current user info (requires Authorization header with Bearer token).

## How 'Remember Me' Works
- On login, if `rememberMe` is true, the backend issues a JWT with a 7-day expiry. Otherwise, the token expires in 1 hour.
- The client should store the token (e.g., in an HTTP-only cookie or localStorage).
- On logout, the client deletes the token.
- For enhanced security, consider storing the JWT in an HTTP-only cookie.

## Running the Server
```bash
npm start
```

## Notes
- Passwords are always hashed before storage.
- JWT secret should be strong and kept private.
- For production, use HTTPS and secure cookies for token storage. 