# Todo List Application

A full-stack todo list application built with React, Node.js, Express, and MongoDB.

## Features

- Create new todos
- Delete existing todos
- Mark todos as complete/incomplete
- Responsive design with dark mode
- Real-time updates
- Data persistence with MongoDB

## Tech Stack

- **Frontend:**
  - React
  - Axios for API calls
  - React Icons
  - CSS with custom variables for theming

- **Backend:**
  - Node.js
  - Express
  - MongoDB with Mongoose
  - CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo_list
```

2. Install backend dependencies:
```bash
cd Server
npm install
```

3. Install frontend dependencies:
```bash
cd ../todolist
npm install
```

## Configuration

1. Make sure MongoDB is running locally on port 27017
2. The backend API runs on `http://localhost:3001`
3. The frontend development server runs on `http://localhost:3000`

## Running the Application

1. Start the MongoDB service:
```bash
mongod
```

2. Start the backend server:
```bash
cd Server
npm start
```

3. In a new terminal, start the frontend development server:
```bash
cd todolist
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
todo_list/
├── Server/                 # Backend directory
│   ├── Models/            # MongoDB models
│   │   └── todos.js      # Todo schema
│   └── index.js          # Express server setup
│
└── todolist/             # Frontend directory
    ├── src/
    │   ├── App.css       # Styles
    │   └── Home.jsx      # Main component
    └── public/           # Static files
```

## API Endpoints

- `GET /` - Fetch all todos
- `POST /add` - Create a new todo
- `DELETE /delete/:id` - Delete a todo by ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details