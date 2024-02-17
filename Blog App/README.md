# Blog App

Welcome to the Blog App! This simple Express.js application demonstrates the MVC (Model-View-Controller) architecture for managing blog posts.

## Installation

1. Clone the repository to your local machine:

bash
git clone https://github.com/UcenELma/ArKx_FS.git


2. Navigate to the project directory:
bash

cd ArKx_FS/Blog\ App


3. Install the dependencies:
bash

npm init -y
npm i express
npm i -D nodemon

### Usage
Start the server:

bash

npm run dev
The server will be running at http://localhost:3000.

Access the application in your browser or use a tool like Postman to interact with the API.

Endpoints
GET /posts: Retrieve all blog posts.
GET /posts/:id: Retrieve a specific blog post by ID.
POST /posts: Create a new blog post.
PUT /posts/:id: Update an existing blog post by ID.
DELETE /posts/:id: Delete a blog post by ID.


#### Example Usage
To retrieve all blog posts: GET http://localhost:3000/posts
To create a new blog post: POST http://localhost:3000/posts with JSON body { "title": "New Post", "content": "This is a new blog post." }
To retrieve a specific blog post: GET http://localhost:3000/posts/1 (replace 1 with the actual post ID)
To update a blog post: PUT http://localhost:3000/posts/1 with JSON body { "title": "Updated Post", "content": "This post has been updated." }
To delete a blog post: DELETE http://localhost:3000/posts/1 (replace 1 with the actual post ID)












