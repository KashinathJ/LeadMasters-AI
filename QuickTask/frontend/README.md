# QuickTask Frontend

React frontend application for QuickTask - Personal Task Management System.

## Features

- ✅ User Authentication (Register/Login/Logout)
- ✅ Task CRUD Operations
- ✅ Filter tasks by status and priority
- ✅ Search tasks by title
- ✅ Sort tasks by date, priority, or due date
- ✅ Dashboard with statistics and charts
- ✅ Productivity analytics integration
- ✅ Responsive design with Tailwind CSS
- ✅ Toast notifications

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Routing
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts and graphs
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Context API** - State management

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, defaults are set):
```env
VITE_API_URL=http://localhost:5000/api
VITE_ANALYTICS_URL=http://localhost:8000
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskFilters.jsx
│   ├── context/         # Context providers
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── Tasks.jsx
│   ├── utils/          # Utility functions
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Integration

The frontend communicates with:
- **Backend API** (`http://localhost:5000/api`) - Authentication and task management
- **Analytics Service** (`http://localhost:8000`) - Statistics and productivity analysis

## Features Details

### Authentication
- Secure JWT-based authentication
- Protected routes
- Auto-redirect on login/logout

### Task Management
- Create, read, update, delete tasks
- Real-time status updates
- Due date tracking with overdue warnings
- Priority levels (Low, Medium, High)

### Filtering & Sorting
- Filter by status (Todo, In Progress, Completed)
- Filter by priority (Low, Medium, High)
- Search by title
- Sort by date, priority, or due date

### Dashboard
- Total task count
- Completion statistics
- Priority distribution chart
- Status distribution chart
- Productivity trends (daily/weekly)

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)
- `VITE_ANALYTICS_URL` - Analytics service URL (default: http://localhost:8000)

## Development

The app uses Vite for fast development with HMR (Hot Module Replacement).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
