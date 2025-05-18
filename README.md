# 📘 Blog Postings REST API

A secure and modular RESTful API for managing blog posts with full CRUD operations, JWT-based authentication, and rate limiting. Built using Node.js and Express.js, this API connects to a relational database (MySQL, PostgreSQL, or MariaDB) for persistent data storage. Tested thoroughly with Postman.

---

## 📺 Demo Video

Watch the full demo and testing instructions:  
🎥 **[Click to Watch the Video]()**

### 🔍 Demo includes:
- 🔐 User Registration
- 🔑 User Login with JWT
- 📝 Creating Blog Posts
- 📥 Retrieving All Posts
- 📄 Fetching a Single Post by ID
- ✏️ Updating Blog Posts
- ❌ Deleting Blog Posts

---

## ✨ Key Features

- 🔒 **JWT Authentication** – Secure user login and access control
- 🔃 **CRUD Functionality** – Full support for creating, reading, updating, and deleting blog posts
- 🚫 **Rate Limiting** – 100 requests per 2 minutes to prevent abuse
- 🛡️ **Security** – Password hashing using `bcryptjs`, `helmet`, and `cors`
- ✅ **Validation & Error Handling** – Clean and informative response messages
- 🧪 **Postman Tested** – Sample requests using `x-www-form-urlencoded` format

---

## 🛠️ Tech Stack

| Category     | Technology                        |
|--------------|------------------------------------|
| Backend      | Node.js, Express.js                |
| Database     | MySQL / PostgreSQL / MariaDB       |
| Auth & Security | JWT, bcryptjs, helmet, cors     |
| Development  | nodemon, dotenv, Postman           |
| Version Control | Git & GitHub                    |

---

## 📦 API Endpoints

| Method | Endpoint         | Description                | Auth Required |
|--------|------------------|----------------------------|----------------|
| POST   | `/auth/register` | Register a new user        | ❌              |
| POST   | `/auth/login`    | Login & get JWT token      | ❌              |
| GET    | `/posts`         | Get all blog posts         | ✅              |
| GET    | `/posts/:id`     | Get a blog post by ID      | ✅              |
| POST   | `/posts`         | Create a new blog post     | ✅              |
| PUT    | `/posts/:id`     | Update an existing post    | ✅              |
| DELETE | `/posts/:id`     | Delete a blog post         | ✅              |

---

## 📝 Sample Request (POST /posts)
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of the blog.",
  "author": "John Doe"
}
