# Node.js Homework - Mail and Image Service

This project is a Node.js application that provides a RESTful API for managing contacts, including features for sending emails and handling image uploads.

## Features

- User authentication with JWT
- Contact management (CRUD operations)
- Emailing services with Nodemailer
- Image uploads to Cloudinary
- Password hashing with bcrypt
- Request validation with Joi (via Celebrate)

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT (jsonwebtoken)** - For generating JSON Web Tokens
- **Nodemailer** - For sending emails
- **Cloudinary** - For cloud-based image storage
- **Multer** - For handling multipart/form-data (file uploads)
- **Bcrypt** - For password hashing
- **Celebrate** - For request validation
- **Dotenv** - For managing environment variables
- **Pino** - For logging

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/IhorBondarchuk/nodejs-hw.git
    ```
2.  Navigate to the project directory and checkout the correct branch:
    ```bash
    cd nodejs-hw
    git checkout 05-mail-and-img
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=3000
    DB_HOST=<your_mongodb_connection_string>
    SECRET_KEY=<your_secret_key>
    UKR_NET_PASSWORD=<your_ukr_net_password>
    UKR_NET_EMAIL=<your_ukr_net_email>
    CLOUDINARY_NAME=<your_cloudinary_name>
    CLOUDINARY_KEY=<your_cloudinary_key>
    CLOUDINARY_SECRET=<your_cloudinary_secret>
    ```

## Usage

- To start the server in development mode (with auto-reloading):
  ```bash
  npm run dev
  ```
- To start the server in production mode:
  ```bash
  npm start
  ```

The server will be running on `http://localhost:3000` (or the port specified in your `.env` file).
