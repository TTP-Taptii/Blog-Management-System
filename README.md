# Blog Management System

A backend REST API where users can register, log in, and manage blog posts. Authentication uses JWT stored in an
httpOnly cookie. Only logged-in users can access blog routes, and only a blog's creator can update or delete it.

## Tech Stack
Node.js, Express 5, MongoDB (Mongoose), JWT, bcryptjs, cookie-parser, cors, dotenv

## Getting Started

```bash
npm install
cp .env.example .env     # then fill in MONGO_URI and JWT_SECRET
npm run dev              # development (nodemon)
npm start                # production
```

### Environment Variables
| Name | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | `development` or `production` | `development` |
| `MONGO_URI` | MongoDB connection string | required |
| `JWT_SECRET` | Secret used to sign tokens | required |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `COOKIE_EXPIRES_DAYS` | Cookie lifetime in days | `7` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:3000` |

## API Endpoints
Base URL: `http://localhost:5000/api`

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register (`name`, `email`, `password`, `phoneNumber`) |
| POST | `/auth/login` | Login (`email`, `password`), sets `token` cookie |
| POST | `/auth/logout` | Clear the cookie |

### User (login required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/me` | Get logged-in user's profile |
| PUT | `/users/me` | Update `name` and/or `phoneNumber` |

### Blogs (login required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/blogs` | Create (`title`, `content`, `authorName`, `tags`, `blogImage`) |
| GET | `/blogs` | List all blogs |
| GET | `/blogs/:id` | Get one blog |
| PUT | `/blogs/:id` | Update a blog (creator only) |
| DELETE | `/blogs/:id` | Delete a blog (creator only) |

Send the JWT as the `token` cookie (set automatically on login) or as `Authorization: Bearer <token>`.

All responses use the same shape: `{ "success": true, "message": "...", "data": ... }`.

### Example
```json
POST /api/blogs
{
  "title": "My first post",
  "content": "Hello world, this is my first blog.",
  "authorName": "Alice",
  "tags": ["intro", "hello"],
  "blogImage": "https://example.com/image.png"
}
```

## Project Structure
```
server.js
src/
  app.js
  config/        env + database connection
  models/        User, Blog
  controllers/   auth, user, blog
  routes/        auth, user, blog
  middlewares/   auth (JWT), validate, error handling
  validators/    request validation rules
  utils/         ApiError, sendResponse, token helpers, pick
```
