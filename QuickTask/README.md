# 🚀 QuickTask - Personal Task Management System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A complete full-stack task management application built with **MERN stack** (MongoDB, Express.js, React.js, Node.js) and a **Python-based analytics microservice**.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based secure authentication
- Protected routes
- Auto-logout on token expiry

### 📝 Task Management
- Create, Read, Update, Delete tasks
- Task fields: Title, Description, Priority, Status, Due Date
- Filter by status (Todo, In Progress, Completed)
- Filter by priority (Low, Medium, High)
- Search tasks by title
- Sort by date, priority, or due date
- Overdue task warnings

### 📊 Dashboard & Analytics
- Total task count
- Completion statistics
- Priority distribution (Pie Chart)
- Status distribution (Bar Chart)
- Productivity trends (Line Chart)
- Daily/Weekly analysis

### 🎨 UI/UX
- Responsive design (Mobile, Tablet, Desktop)
- Modern Tailwind CSS styling
- Toast notifications
- Loading states
- Form validation

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library with Hooks
- **Vite 5.0** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Recharts 2.10** - Chart library for analytics
- **Axios 1.6** - HTTP client
- **React Router 6.20** - Client-side routing
- **React Toastify 9.1** - Toast notifications
- **Context API** - State management

### Backend
- **Node.js 14+** - Runtime environment
- **Express.js 4.18** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs 2.4** - Password hashing
- **CORS** - Cross-origin resource sharing

### Analytics Service
- **Python 3.8+** - Runtime environment
- **FastAPI 0.129** - Modern web framework
- **PyMongo 4.16** - MongoDB driver
- **Uvicorn** - ASGI server

---

## 📁 Project Structure

```
QuickTask/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Layout.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskFilters.jsx
│   │   ├── context/          # Context API providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── TaskContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Tasks.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                  # Node.js backend API
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   └── tasks.js        # Task CRUD routes
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── server.js           # Express server entry point
│   └── package.json
│
├── analytics_service/        # Python FastAPI microservice
│   ├── main.py             # FastAPI application
│   ├── database.py         # MongoDB connection
│   ├── config.py           # Configuration
│   └── requirements.txt    # Python dependencies
│
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── SETUP_GUIDE.md          # Detailed setup instructions
├── INSTALL_NODEJS.md       # Node.js installation guide
├── setup_all.ps1          # Automated setup script (Windows)
├── start-all.ps1          # Start all services script
└── test_services.ps1       # Service health check script
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/QuickTask.git
cd QuickTask
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quicktask
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 3. Setup Analytics Service

```bash
cd ../analytics_service
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `analytics_service` directory:

```env
MONGODB_URI=mongodb://localhost:27017/quicktask
ANALYTICS_PORT=8000
```

### 4. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
VITE_ANALYTICS_URL=http://localhost:8000
```

### 5. Automated Setup (Windows)

Alternatively, use the automated setup script:

```powershell
.\setup_all.ps1
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (use a strong random string)
- `NODE_ENV` - Environment mode (development/production)

#### Analytics Service (.env)
- `MONGODB_URI` - MongoDB connection string (same as backend)
- `ANALYTICS_PORT` - Analytics service port (default: 8000)

#### Frontend (.env) - Optional
- `VITE_API_URL` - Backend API URL
- `VITE_ANALYTICS_URL` - Analytics service URL

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/quicktask`

**Option 2: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` files
5. Add your IP to whitelist

---

## 🏃 Running the Application

### Development Mode

#### Option 1: Automated Start (Windows)

```powershell
.\start-all.ps1
```

This opens 3 separate terminal windows automatically.

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Analytics Service:**
```bash
cd analytics_service
source venv/bin/activate  # On Windows: venv\Scripts\activate
python main.py
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Analytics API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

---

## 📡 API Documentation

### Backend API (http://localhost:5000/api)

#### Authentication

**POST** `/auth/register`
- Register a new user
- Body: `{ "name": "string", "email": "string", "password": "string" }`
- Returns: `{ "token": "string", "user": {...} }`

**POST** `/auth/login`
- Login user
- Body: `{ "email": "string", "password": "string" }`
- Returns: `{ "token": "string", "user": {...} }`

#### Tasks (Protected - Requires JWT Token)

**GET** `/tasks`
- Get all tasks for authenticated user
- Query params: `status`, `priority`, `search`, `sortBy`, `sortOrder`
- Headers: `Authorization: Bearer <token>`

**GET** `/tasks/:id`
- Get a single task by ID

**POST** `/tasks`
- Create a new task
- Body: `{ "title": "string", "description": "string", "priority": "Low|Med|High", "status": "Todo|In Progress|Completed", "dueDate": "ISO date" }`

**PUT** `/tasks/:id`
- Update a task

**DELETE** `/tasks/:id`
- Delete a task

### Analytics API (http://localhost:8000)

**GET** `/user-stats/{userId}`
- Get user statistics
- Returns: Total tasks, completion percentage, priority/status distribution

**GET** `/productivity-analysis/{userId}?groupBy=day|week`
- Get productivity trends
- Returns: Task completion trends over time

**GET** `/docs`
- Interactive API documentation (Swagger UI)

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to:
   - [Vercel](https://vercel.com/)
   - [Netlify](https://www.netlify.com/)
   - [GitHub Pages](https://pages.github.com/)

3. Update environment variables in deployment platform:
   - `VITE_API_URL` - Your backend API URL
   - `VITE_ANALYTICS_URL` - Your analytics API URL

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables:
   - `PORT`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

2. Deploy to:
   - [Railway](https://railway.app/)
   - [Render](https://render.com/)
   - [Heroku](https://www.heroku.com/)

### Analytics Service Deployment

1. Set environment variables:
   - `MONGODB_URI`
   - `ANALYTICS_PORT`

2. Deploy to:
   - [Railway](https://railway.app/)
   - [Render](https://render.com/)
   - [PythonAnywhere](https://www.pythonanywhere.com/)

### Docker Deployment (Optional)

Create `Dockerfile` for each service and use `docker-compose.yml` for orchestration.

---

## 🧪 Testing

### Test Services

```powershell
.\test_services.ps1
```

### Manual Testing

```bash
# Test Backend
curl http://localhost:5000/api/health

# Test Analytics
curl http://localhost:8000/health
```

---

## 🐛 Troubleshooting

### npm is not recognized
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart terminal after installation
- See `INSTALL_NODEJS.md` for detailed instructions

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` files
- For MongoDB Atlas, verify IP whitelist

### Port Already in Use
- Change `PORT` in backend `.env`
- Change `ANALYTICS_PORT` in analytics `.env`
- Change port in `frontend/vite.config.js`

### Python Virtual Environment Issues
```bash
cd analytics_service
rm -rf venv  # On Windows: Remove-Item -Recurse -Force venv
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- FastAPI for the modern Python framework
- MongoDB for the flexible database
- All open-source contributors

---

## 📞 Support

For support, email support@example.com or open an issue in the repository.

---

**⭐ If you like this project, please give it a star!**
