🚀Prep Pilot - Generative AI Interview Preparation Platform
Prep Pilot is a cutting-edge full-stack web application designed to empower job seekers using Generative AI. By leveraging the Groq LPU (Language Processing Unit) inference engine, the platform provides near-instant analysis of resumes and job descriptions, generating personalized technical questions, skill-gap reports, and structured 7-day roadmaps.

🚀 Features
Instant AI Analysis: Compares your resume (PDF) and self-description against a specific Job Description (JD) using high-speed LLMs.

Personalized Interview Prep: Generates technical and behavioral questions with expected answers and interviewer intent.

Skill Gap Identification: Highlights missing technical skills and categorizes them by severity (Low, Medium, High).

7-Day Roadmap: Provides a day-by-day study plan to get interview-ready based on the generated gap analysis.

AI Resume Optimizer: Generates a targeted, ATS-friendly resume in PDF format tailored specifically to the target JD.

User Dashboard: Securely save, track, and re-visit multiple interview reports for different job applications.

🛠️ Tech Stack
Frontend:

React.js: Functional components and hooks for a dynamic UI.

React Router: Client-side navigation.

SASS (SCSS): Modular and responsive styling.

Context API: Global state management for Authentication and Interview data.

Backend:

Node.js & Express: Server-side logic and RESTful API routing.

MongoDB & Mongoose: NoSQL database for storing users and interview reports.

Groq SDK: High-performance AI inference (Llama-3.3-70b-versatile).

Puppeteer: Headless browser integration to convert AI-generated HTML into high-quality PDF resumes.

JWT & Cookie-parser: Secure authentication and session management.

Multer: Handling multi-part form data for resume uploads.

PDF-Parse: Extracting text content from uploaded PDF resumes.

📂 Project Structure

The project follows a Four-Layer Architecture on the frontend for maximum maintainability:

UI Layer: React components and pages.

Hook Layer: Custom hooks (e.g., useAuth, useInterview) to manage business logic.

State Layer: Context providers for managing global application state.

API Layer: Service files (using Axios) to communicate with the Node.js backend.

🏁 Getting Started

Prerequisites

Node.js installed.

MongoDB Atlas account or local MongoDB instance.

Groq Cloud API Key (Get it at console.groq.com).

Installation

Clone the repository:

Bash
git clone https://github.com/sakshiagrawal03/Prep-Pilot

cd prep-pilot

Backend Setup:

Bash
cd backend
npm install
Create a .env file in the backend folder:

Code snippet

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

Start the server:

Bash

npm run dev

Frontend Setup:

Bash

cd ../frontend

npm install

Start the development server:

Bash

npm run dev

🔌 API Endpoints

Authentication

POST /api/auth/register - Register a new user.

POST /api/auth/login - Login and receive a secure JWT cookie.

GET /api/auth/get-me - Fetch current logged-in user details.

GET /api/auth/logout - Clear cookies and terminate session.

Interview & AI Services

POST /api/interview/generate - Upload resume (PDF) and JD to generate an AI report.

GET /api/interview/reports - Fetch all generated reports for the logged-in user.

GET /api/interview/report/:id - Fetch details of a specific report by ID.

POST /api/interview/resume/pdf/:id - Generate and download a tailored PDF resume using Groq & Puppeteer.

📄 License

Created by Sakshi Agrawal | Full Stack Web Development Project
