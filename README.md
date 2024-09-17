# Learning Platform with ChatGPT Integration

This project is an online learning platform built using the MERN stack (MongoDB, Express, React, Node.js) with ChatGPT integration for course suggestions. Users can sign up as students or instructors, manage courses, and interact with a personalized AI-powered course recommendation feature.

## Requirements

- **Node.js** (v16+)
- **MongoDB** (locally or a cloud instance like MongoDB Atlas)

## Features

- **JWT Authentication**: Users need to log in to perform any CRUD operations.
- **Role-based features**: 
  - **Students**: View and enroll in courses.
  - **Instructors**: Create, update, and delete their own courses, and view enrolled students.
- **AI-powered course recommendations**: ChatGPT integration allows students to get personalized course suggestions.
  
## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/your-repo-url.git
cd your-repo-directory

### 2.  Install dependencies:
-**Run the following commands in the root directory to install both backend and frontend dependencies:

```bash
npm install
npm install --prefix frontend

### 3. Set up environment variables:
-**Create a .env file in the root directory and set the following environment variables:
  - **PORT=5000
  - **MONGODB_URI=your-mongo-uri
  - **JWT_SECRET=your-secret-key
  - **NODE_ENV=development
  - **OPENAI_API_KEY=your-chat-gpt-API-key

### 4. Update backend and frontend configurations:
 -**Replace the backend URL in the frontend by editing the file at: frontend/src/config/api.js Example
 -**const API_BASE_URL = "http://localhost:5000/api"
 
 -**Replace the frontend URL in the server.js file of the backend: Example:
   --** origin: 'http://localhost:5173'

### 5. Run the development servers:
  --** Use concurrently to run both backend and frontend servers simultaneously:
```bash
 -** npm run dev

### 6. deployment:
 --**Frontend: Deploy on Netlify
 --**Backend: Deploy on Render

    
  
