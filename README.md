General description:

1. server.js: Core Express

- Express JSON parser
- CORS
- JWT authentication
- Socket.io
- Routes
  example: url: /auth/home
  header: authorization : Bearer <_TOKEN HERE_>

  1.2. routes/auth.js: Complete authentication endpoints

- POST /signup - Creates new user and returns JWT
- POST /login - Authenticates user and returns JWT
- GET /home - Protected route example

  1.3. routes/game.js: Complete game endpoints

- GET /game/list - get all games
- POST /game/create-game - Creates new game and returns game id
- POST /game/remove-game - Removes game
- POST /game/add-player - Adds player to game
- POST /game/remove-player - Removes player from game
- POST /game/start-game - Starts game
- POST /game/finish-game - Finishes game
- GET /game/get-game-by-id - Gets game by id
- POST /game/update-active-player - Updates active player

  1.4. db:

- db-init.js: Database connection and initialization
- db-functions.js: Authentication middleware
  - authenticateToken for protected routes
  - preventAuthenticatedToken for login/signup protection
- models.js: User & Game model definition

2. client:

- src/pages:

  - App.jsx: Main app component
  - LoginPage.jsx: Login page
  - SignupPage.jsx: Signup page
  - IndexPage.jsx: Index page without login
  - ProfilePage.jsx: Profile page
  - MenuLingoGame.jsx: Menu for Halloween Game page
  - MemoryGame.jsx: Memory Game page
  - LocalHalloweenGame.jsx: Local Halloween Game page
  - OnlineHalloweenGame.jsx: Online Halloween Game
  - MenuLingoPractice.jsx: Menu for Lingo Practice page

- src/styles:
  - login-page.css: Login page styles
  - signup-page.css: Signup page styles
- src/hooks:
  - gameMenuAPI.js: Game menu API
