> Postman Documentation: 
> [here](https://documenter.getpostman.com/view/29492816/2s9YsGhYfA)

# E-Commerce Backend Test ADS

This API serves as the backend for a basic e-commerce platform, providing endpoints for user authentication, product management, order handling, and chart functionalities.

## Installation

Make sure you have Node.js and npm installed on your machine before proceeding.

1. Clone this repository.
2. `cd` into the project directory.
3. Run `yarn install` to install all dependencies.

## Usage

1. Create a `.env` file in your project's root directory and populate it with your database, port, and jwt key configuration, for example:

    ```plaintext
    DB_HOST=localhost
    DB_USER=your_username
    DB_PASS=your_password
    DB_NAME=your_database_name

    PORT=3001
    JWT_KEY=secret
    ```

2. Ensure you have created a database with the appropriate name.

3. To run table migrations and seeder automate, use the command:

    ```bash
    npm run migrate
    ```

4. Start the application with the command:

    ```bash
    npm start
    ```

The application will run at `http://localhost:3001`.


