# Book Review API

## Overview
The Book Review API is a RESTful API that allows users to manage books, reviews, and user accounts. It provides endpoints for creating, reading, updating, and deleting books and reviews, as well as user registration and authentication.

## Features
- Book Management: Create, retrieve, update, and delete books.
- Review Management: Create, retrieve, update, and delete reviews for books.
- User Management: User registration, login, and profile management.
- Authentication: Middleware to protect routes and ensure user authentication.

## Project Structure
```
book-review-api
src/
├── controllers/          # Contains controller files for handling requests
│   ├── bookController.js
│   ├── reviewController.js
│   └── userController.js
├── models/               # Contains model files defining data schemas
│   ├── book.js
│   ├── review.js
│   └── user.js
├── middleware/           # Contains middleware for authentication and error handling
│   ├── authMiddleware.js
│   └── errorHandler.js
├── routes/              # Contains route definitions for the API
│   ├── bookRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
├── config/              # Contains configuration files
│   └── index.js
├── index.js               # Main application file
├── package.json         # Project metadata and dependencies
└── .env                 # Environment variables
```

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd book-review-api
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/bookreviewdb
     JWT_SECRET=your_jwt_secret
     ```

5. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

### How to Run Locally

Start the server with:

```bash
npm start
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## Example API Requests

### Register a User

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create a Book

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Book Title","author":"Author Name","description":"A great book."}'
```

### Add a Review

```bash
curl -X POST http://localhost:3000/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"bookId":"<book_id>","rating":5,"comment":"Excellent read!"}'
```

## API Endpoints

- **Books**
  - `POST /books` - Create a new book
  - `GET /books` - Retrieve all books
  - `GET /books/:id` - Retrieve a book by ID
  - `PUT /books/:id` - Update a book by ID
  - `DELETE /books/:id` - Delete a book by ID

- **Reviews**
  - `POST /reviews` - Create a new review
  - `GET /reviews` - Retrieve all reviews
  - `GET /reviews/:id` - Retrieve a review by ID
  - `PUT /reviews/:id` - Update a review by ID
  - `DELETE /reviews/:id` - Delete a review by ID

- **Users**
  - `POST /users/register` - Register a new user
  - `POST /users/login` - Log in a user
  - `GET /users/profile` - Get user profile
  - `PUT /users/profile` - Update user profile

## Design Decisions & Assumptions

- JWT is used for authentication.
- Passwords are hashed before storage.
- Only authenticated users can create, update, or delete books and reviews.
- Users can only update or delete their own reviews.
- MongoDB is used as the database.

## Database Schema

### User

| Field     | Type    | Description         |
|-----------|---------|---------------------|
| _id       | ObjectId| Primary key         |
| username  | String  | Unique username     |
| email     | String  | Unique email        |
| password  | String  | Hashed password     |

### Book

| Field       | Type     | Description         |
|-------------|----------|---------------------|
| _id         | ObjectId | Primary key         |
| title       | String   | Book title          |
| author      | String   | Book author         |
| description | String   | Book description    |

### Review

| Field     | Type     | Description         |
|-----------|----------|---------------------|
| _id       | ObjectId | Primary key         |
| bookId    | ObjectId | Reference to Book   |
| userId    | ObjectId | Reference to User   |
| rating    | Number   | Rating (1-5)        |
| comment   | String   | Review comment      |

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.


#Assmptions:=
mongodb is live running install npm and run node index.js 
console log print:-
>>>>>Server is running on port 3000
Connected to MongoDB +++++++++++++
