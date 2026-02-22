Node.js Homework: Express API with Mock Notes (02-mongodb Branch)
Description
This project is a simple Node.js Express server demonstrating REST API basics. It includes routes for managing notes (using mock data), CORS support, structured logging with Pino, and error handling. Although named "02-mongodb", actual MongoDB integration is not implemented yet—endpoints return static responses.
Tech Stack

Node.js
Express.js ^5.2.1
CORS ^2.8.6
Pino ^11.0.0 (for logging)
Dotenv ^17.3.1 (for env vars)
Dev: Nodemon, ESLint, Prettier

Installation

Clone the repo: git clone https://github.com/IhorBondarchuk/nodejs-hw.git
Checkout branch: git checkout 02-mongodb
Install dependencies: npm install
Copy .env.example to .env and set PORT=3000 and NODE_ENV=development

Usage

Development: npm run dev (uses Nodemon for auto-reload)
Production: npm start
Server runs on http://localhost:3000 (or custom PORT)

API Endpoints

GET /notes: Retrieve all notes (mock: { "message": "Retrieved all notes" })
GET /notes/:noteId: Retrieve note by ID (mock: { "message": "Retrieved note with ID: <noteId>" })
GET /test-error: Simulate error (500: { "message": "Simulated server error" })

Error Handling

Global middleware catches errors and logs them.
404 for unknown routes.

Development Notes

Use ESLint for linting: npm run lint
Logging is pretty-printed in dev mode.

For contributions, fork and PR. Future: Add MongoDB integration.
