# API Backend Project

This project is an API backend that supports user authentication with a login screen. It is built using TypeScript and Express.

## Project Structure

```
api-backend
├── src
│   ├── controllers
│   │   └── authController.ts
│   ├── routes
│   │   └── authRoutes.ts
│   ├── services
│   │   └── authService.ts
│   ├── models
│   │   └── userModel.ts
│   ├── middlewares
│   │   └── authMiddleware.ts
│   ├── utils
│   │   └── index.ts
│   └── app.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd api-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run:
```
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST /api/auth/login**
  - Description: Authenticates a user and returns a token.
  - Request Body: 
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **POST /api/auth/register**
  - Description: Registers a new user.
  - Request Body: 
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.