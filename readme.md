# Task Manager App (MERN)

This is a Task Manager application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to manage their tasks efficiently by providing features to create, read, update, and delete tasks.

## Features

- User authentication and authorization
- Create, read, update, and delete tasks
- Mark tasks as completed
- Filter tasks by status (completed, pending)
- Responsive design

## Technologies Used

- **Frontend:**

  - React.js
  - Redux for state management
  - Axios for API calls
  - Bootstrap for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose for database management
  - JWT for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Task_Manager_App_MERN.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Task_Manager_App_MERN
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Create a `.env` file in the `server` directory and add the following environment variables:

   ```
   PORT = port_number
   MONGO_URI=your_mongodb_connection_string
   CORS_ORIGIN = frontend_url
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:

   ```bash
   cd server
   npm run dev
   ```

6. In another terminal, start the React development server:
   ```bash
   cd client
   npm start
   ```

## Usage

1. Register a new account or log in with an existing account.
2. Create new tasks and manage them using the provided features.
3. Filter tasks based on their status to easily track progress.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, please contact iamnanak01@gmail.com.

new line
