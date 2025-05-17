# 📘 Blog Postings REST API with Database Integration

## 📌 Project Overview

This is a simple RESTful API for managing blog posts. It supports full CRUD operations and uses a relational database (PostgreSQL, MySQL, or MariaDB). The API is tested using Postman.

* Provide basic API Security
* Rate limiter (Every 2mins, 100 transactions)

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL / MySQL / MariaDB  
- **Tools:** Postman, GitHub

---

## 🚀 API Endpoints

| Method | Endpoint        | Description                       |
|--------|-----------------|-----------------------------------|
| GET    | `/posts`        | Retrieve all blog posts           |
| GET    | `/posts/:id`    | Retrieve a specific blog post     |
| POST   | `/posts`        | Create a new blog post            |
| PUT    | `/posts/:id`    | Update an existing blog post      |
| DELETE | `/posts/:id`    | Delete a blog post                |


### 📝 Sample Blog Post JSON
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of the blog.",
  "author": "John Doe"
}
```

# Testing with Postman
Test all endpoints using Postman.

Save the Postman collection.

Record a video demonstrating the functionality:

* Showing adding a new post

* Getting all posts

* Getting one post by ID

* Editing a post

* Deleting a post
Google Drive
https://drive.google.com/drive/folders/1aHqUwpwOxS_Fc1dKs7tBLhkwD7ezUmic?usp=drive_link