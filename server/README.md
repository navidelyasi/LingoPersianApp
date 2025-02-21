Server side description:

1. server.js: Core Express setup

- Express JSON parser
- CORS
- Routes

2. routes/auth.js: Complete authentication endpoints

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

- All using proper error handling and JWT authentication

3. db folder:

- db-init.js: Database connection and initialization
- db-functions.js: Authentication middleware
  - authenticateToken for protected routes
  - preventAuthenticatedAccess for login/signup protection
- models.js: User model definition

\*\*\* authentication flow is now:

1. Client sends credentials → Server validates → Returns JWT
2. Client stores JWT
3. Client includes JWT in Authorization header for protected routes
4. Server validates JWT using authenticateToken middleware

\*\*\* Client side should:

1. Store JWT securely (localStorage/sessionStorage)
2. Include JWT in API requests
3. Handle authentication state
4. Implement protected routes
