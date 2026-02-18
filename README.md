# Node.js Homework Server

A lightweight Express.js server application demonstrating core Node.js concepts including HTTP routing, middleware integration, error handling, and logging. This project serves as an educational foundation for understanding server-side JavaScript development.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a Node.js homework assignment that implements a basic REST API server using Express.js. It demonstrates essential server-side development practices including middleware configuration, request routing, error handling, and structured logging with Pino.

The server provides endpoints for managing notes (though currently with mock implementations) and includes comprehensive error handling and request logging capabilities.

## Features

- **Express.js Server** — Lightweight HTTP server framework for building REST APIs
- **CORS Support** — Cross-Origin Resource Sharing enabled for frontend integration
- **Structured Logging** — Pino-HTTP middleware with pretty formatting for development
- **Error Handling** — Global error handler middleware for graceful error responses
- **Environment Configuration** — Dotenv support for environment-based configuration
- **ESLint Integration** — Code quality enforcement with ESLint configuration
- **Nodemon Support** — Automatic server restart during development
- **ES Modules** — Modern JavaScript module syntax (import/export)

## Tech Stack

| Technology      | Version | Purpose                                  |
| --------------- | ------- | ---------------------------------------- |
| **Node.js**     | 18+     | JavaScript runtime environment           |
| **Express.js**  | 5.2.1   | Web application framework                |
| **CORS**        | 2.8.6   | Cross-origin resource sharing middleware |
| **Dotenv**      | 17.3.1  | Environment variable management          |
| **Pino**        | 11.0.0  | Structured logging library               |
| **Pino-Pretty** | 13.1.3  | Pretty-print Pino logs for development   |
| **Nodemon**     | 3.1.11  | Development server auto-restart          |
| **ESLint**      | 10.0.0  | Code quality and style checking          |

## Project Structure

```
nodejs-hw/
├── src/
│   └── server.js              # Main server file with all routes and middleware
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── eslint.config.mjs          # ESLint configuration
├── .env                       # Environment variables (not included in repo)
└── README.md                  # This file
```

### File Descriptions

**`src/server.js`** — The main server file containing:

- Express application initialization
- Middleware configuration (JSON parsing, CORS, logging)
- Route definitions (GET /notes, GET /notes/:noteId)
- Error handling middleware
- Server startup logic

**`package.json`** — Project metadata and configuration:

- Dependencies: Express, CORS, Dotenv, Pino
- Dev dependencies: ESLint, Nodemon
- Scripts: `start` and `dev` for running the server

**`eslint.config.mjs`** — ESLint rules for code quality:

- Enforces semicolons
- Detects unused variables
- Validates variable definitions

## Installation

### Prerequisites

- **Node.js** version 18 or higher
- **npm** (comes with Node.js)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IhorBondarchuk/nodejs-hw.git
   cd nodejs-hw
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   touch .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration) section)

## Usage

### Starting the Server

**Development mode** (with auto-restart on file changes):

```bash
npm run dev
```

**Production mode** (single start):

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

### Example Output

```
[13:45:22] GET /notes 200 - 2ms
[13:45:25] GET /notes/123 200 - 1ms
[13:45:30] GET /unknown-route 404 - 0ms
```

## API Endpoints

### Get All Notes

**Request:**

```http
GET /notes
```

**Response:**

```json
{
  "message": "Retrieved all notes"
}
```

**Status Code:** 200 OK

---

### Get Note by ID

**Request:**

```http
GET /notes/:noteId
```

**Parameters:**

- `noteId` (string) — The unique identifier of the note

**Example:**

```http
GET /notes/123
```

**Response:**

```json
{
  "message": "Retrieved note with ID: 123"
}
```

**Status Code:** 200 OK

---

### Test Error Handler

**Request:**

```http
GET /test-error
```

**Response:**

```json
{
  "message": "Simulated server error"
}
```

**Status Code:** 500 Internal Server Error

This endpoint is provided for testing the error handling middleware.

---

### Not Found Route

**Request:**

```http
GET /unknown-route
```

**Response:**

```json
{
  "message": "Route not found"
}
```

**Status Code:** 404 Not Found

## Configuration

### Environment Variables

Create a `.env` file in the project root directory with the following variables:

```env
PORT=3000
NODE_ENV=development
```

**Variables:**

| Variable   | Default     | Description                               |
| ---------- | ----------- | ----------------------------------------- |
| `PORT`     | 3000        | The port on which the server listens      |
| `NODE_ENV` | development | Environment mode (development/production) |

### Example .env File

```env
PORT=5000
NODE_ENV=development
```

## Development

### Running the Development Server

```bash
npm run dev
```

Nodemon will automatically restart the server when you modify files in the `src/` directory.

### Code Quality

The project uses ESLint to enforce code quality. The configuration enforces:

- **Semicolons** — All statements must end with semicolons
- **No unused variables** — Unused variables will trigger an error
- **Variable validation** — All variables must be defined before use

### Modifying Routes

To add a new route, edit `src/server.js` and add a new route handler:

```javascript
app.get('/new-route', (req, res) => {
  res.status(200).json({ message: 'New route response' });
});
```

## Error Handling

The server includes a global error handler middleware that catches all errors and returns a JSON response:

```javascript
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: err.message });
});
```

**Error Response Format:**

```json
{
  "message": "Error description"
}
```

**Status Code:** 500 Internal Server Error

### Handling Specific Errors

To handle specific errors, wrap your route logic in a try-catch block:

```javascript
app.get('/notes/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Note ID is required');
    res.status(200).json({ message: `Retrieved note ${id}` });
  } catch (error) {
    next(error);
  }
});
```

## Logging

The server uses **Pino-HTTP** for structured logging with pretty formatting in development mode.

### Log Format

```
[HH:MM:ss] METHOD /route STATUS_CODE - RESPONSE_TIMEms
```

**Example:**

```
[13:45:22] GET /notes 200 - 2ms
[13:45:25] POST /notes 201 - 5ms
[13:45:30] GET /unknown 404 - 1ms
```

### Log Configuration

The logging is configured in `src/server.js`:

```javascript
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);
```

### Log Levels

- **info** — General information about requests and responses
- **error** — Error messages from the error handler
- **debug** — Detailed debugging information (not enabled by default)

## Troubleshooting

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:** Change the port in your `.env` file:

```env
PORT=3001
```

Or kill the process using the port:

```bash
# On macOS/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found

**Error:** `Error: Cannot find module 'express'`

**Solution:** Install dependencies:

```bash
npm install
```

### Nodemon Not Working

**Error:** `command not found: nodemon`

**Solution:** Install dev dependencies:

```bash
npm install --save-dev nodemon
```

### CORS Issues

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** CORS is already enabled in the server. Ensure your frontend is making requests to the correct URL and port.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the **ISC License** — see the `package.json` file for details.

---

## Quick Reference

| Command       | Purpose                        |
| ------------- | ------------------------------ |
| `npm install` | Install dependencies           |
| `npm run dev` | Start server with auto-restart |
| `npm start`   | Start server once              |
| `npm test`    | Run tests (not configured)     |

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/IhorBondarchuk/nodejs-hw/issues).

---

**Last Updated:** February 2025
**Author:** Ihor Bondarchuk
**Repository:** [nodejs-hw](https://github.com/IhorBondarchuk/nodejs-hw)
