🍬 Sweet Shop Management System (Frontend)
Welcome to the frontend repository for the Sweet Shop Management System! This is a modern, responsive Single Page Application (SPA) built with React (Vite), designed to provide a delightful and intuitive user experience for browsing and managing a boutique sweet shop.

This project was developed as part of the AI Kata, demonstrating modern frontend practices, secure integration with a Spring Boot backend, and the effective use of AI tools to accelerate UI/UX design.

🌐 Live Demo
The application is currently live! https://sweetshop-frontend2.vercel.app/login

📖 Project Overview
The Sweet Shop Frontend serves as both the customer storefront and the administrative control panel. It connects to a RESTful backend to manage inventory, authentication, and sales.

Key Features:

Dynamic Dashboard: A visually engaging catalog of sweets with smart image mapping based on categories (e.g., Chocolate, Cake).

Role-Based Access Control (RBAC):

Customers: Can browse, search, filter by category, and purchase sweets.

Admins: Gain access to a protected inventory management panel to add, restock, and delete items.

Smart Search & Filtering: Instant client-side filtering by name and category for a snappy user experience.

Secure Authentication: Seamless integration with JWT-based backend security, handling login sessions and protected routes.

Modern UI/UX: Styled with a custom "Chocolate Theme" using CSS variables, glassmorphism effects, and responsive grid layouts.
<img width="1336" height="671" alt="Screenshot 2025-12-14 030807" src="https://github.com/user-attachments/assets/05cb56e8-aef9-495a-a12b-255123fbfbb9" />

<img width="1832" height="923" alt="Screenshot 2025-12-14 030714" src="https://github.com/user-attachments/assets/639e95a8-5812-497b-896a-278f4105671d" />

🛠️ Tech Stack
Framework: React 18

Build Tool: Vite

Styling: CSS Modules, Custom CSS Variables, Bootstrap (Grid/Layout)

State Management: React Context API (AuthContext)

Routing: React Router DOM v6

HTTP Client: Axios (with interceptors for JWT)

Deployment: Vercel (Frontend), Render (Backend)

🚀 Setup & Run Instructions
Follow these steps to get the frontend running on your local machine.

Prerequisites
Node.js (v16 or higher) and npm installed.

The Backend Application (Spring Boot) must be running on http://localhost:8081.

Installation
Clone the repository and open your terminal in the project root.

Install dependencies:

Bash

npm install
Configuration (Optional)
The application is pre-configured to proxy requests to http://localhost:8081/api. If your backend is running on a different port, update the baseURL in: src/api/axiosConfig.js

Run the Development Server
Start the application in development mode:

Bash

npm run dev
The application will typically start on http://localhost:5173. Open this URL in your browser.

🖥️ Application Tour
1. Public Access (Login/Register)
New Users: Can register for an account. By default, they are assigned the USER role.

Login: Existing users (and Admins) can log in. The app securely stores the received JWT in localStorage to persist the session.

2. Customer Dashboard
Browse: View all available sweets with dynamic images.

Search & Filter: Use the search bar or category chips (e.g., "Chocolate", "Cake") to filter the list instantly.

Purchase: Click "Buy" to purchase a sweet (decrements stock on the backend). Note: The button is disabled if stock is 0.

3. Admin Panel (Protected)
Access: Only users with the ADMIN role see the "Admin Panel" button.

Inventory Control: Admins can add new sweets (with custom image URLs), "Restock" items to increase quantity, or "Delete" items entirely.

🤖 My AI Usage
Transparency Statement: In compliance with the AI Kata assessment guidelines, I utilized AI tools to accelerate development, debug complex issues, and refine the UI/UX. Below is a detailed breakdown of my collaboration with AI.

Primary Tool: Google Gemini

🎨 UI/UX Design & Styling
Challenge: I wanted a specific "Chocolate & Dessert" aesthetic but lacked the advanced CSS skills to create complex gradients and glassmorphism effects from scratch.

AI Solution: I described my vision to Gemini: "Design a modern, premium, chocolate-themed UI with glassmorphism." It generated the CSS variables for the color palette (--chocolate-dark, --caramel) and the CSS for the "Chocolate Drip" effect on the navbar. This allowed me to achieve a professional look in minutes.

⚛️ React Context & State Management
Challenge: I encountered an "Invalid Hook Call" error and a white screen crash when setting up the AuthContext.

AI Solution: I pasted the error log into Gemini. It correctly identified that I was calling useContext(AuthContext) inside the App component before it was wrapped in the AuthProvider. It refactored my routing to use separate ProtectedRoute wrapper components, solving the crash.

🔌 API Integration
Challenge: Handling the alignment between the Frontend API calls and the Backend Controller endpoints (specifically ensuring quantity was sent as a Query Param, not in the Body).

AI Solution: I provided the Backend Controller code to Gemini, and it generated the corresponding sweetApi.js functions (using Axios) that perfectly matched the backend's expected signatures (e.g., /api/sweets/{id}/purchase?quantity=1).

Reflection
Using AI for the frontend allowed me to focus on functionality and user experience rather than getting stuck on CSS syntax or boilerplate API code. It acted as a "Senior Frontend Developer" pair programmer, helping me structure my Context API correctly and ensuring my component hierarchy was sound.

⚠️ Challenges & Solutions
1. The CORS Block

Issue: Even after fixing the code, the frontend requests were failing with Network Errors.

Solution: I realized the browser was blocking requests from port 5173 to 8081. I had to configure a WebConfig class in the Spring Boot backend to explicitly allow CORS requests from my frontend's origin (and now the Vercel domain).

2. Image Handling

Issue: We didn't want to store binary images in the database, but we wanted a visual dashboard.

Solution: I implemented a "Smart Image Mapper" utility function in React. It checks the sweet's category (e.g., "Cookie") and automatically assigns a high-quality fallback image URL if the admin doesn't provide a custom one. This made the dashboard look populated and professional immediately.

🧪 Testing
While this repository focuses on the UI, manual testing was performed to ensure:

Registration/Login flow: Verified token storage and redirection.

Protected Routes: Confirmed that unauthenticated users are redirected to Login when trying to access /dashboard.

Admin Guards: Verified that standard users cannot see Admin controls, even if they attempt to manipulate the URL.
