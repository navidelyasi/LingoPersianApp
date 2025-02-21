\*\*\* Client side should:

1. Store JWT securely (localStorage/sessionStorage)
2. Include JWT in API requests
3. Handle authentication state
4. Implement protected routes

\*\*\* Server Side:

- POST /signup - Creates new user and returns JWT

  example: http://localhost:3000/auth/signup
  header: Content-Type : application/json
  body: raw : JSON : {
  "name": "test2",
  "email": "test2@me.com",
  "password": "test123"
  }

- POST /login - Authenticates user and returns JWT

  example: http://localhost:3000/auth/login
  header: Content-Type : application/json
  body: raw : JSON : {
  "email": "test2@me.com",
  "password": "test123"
  }

- GET /home - Protected route example

  example: http://localhost:3000/auth/home
  header: authorization : Bearer <_TOKEN HERE_>
