# Career Counseling System

A full-stack web application for career assessment and recommendations. Built with Django REST Framework (backend) and React + Vite (frontend).

## Features

- **User Authentication**: Register, Login, JWT-based authentication
- **Career Assessment Quiz**: 20 questions across 4 categories (Interests, Skills, Personality, Values)
- **Personalized Recommendations**: AI-powered career path matching
- **Results History**: Track your assessment progress over time
- **Admin Dashboard**: Manage questions, view all results, and track statistics

## Tech Stack

### Backend
- Django 5
- Django REST Framework
- Simple JWT for authentication
- SQLite (default)

### Frontend
- React 18
- Vite
- Framer Motion for animations
- React Router

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/amjaid/career-counseling.git
cd career-counseling

# Start both services
docker-compose up --build
```

### Manual Setup

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed initial data (career paths & questions)
python manage.py seed_data

# Create admin user
python manage.py createsuperuser

# Run server
python manage.py runserver
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login
- `GET /api/auth/me/` - Get current user
- `GET /api/auth/profile/` - Get/Update profile

### Questions
- `GET /api/questions/` - List all questions
- `GET /api/questions/?category=interests` - Filter by category

### Assessments
- `POST /api/assessments/submit/` - Submit answers
- `GET /api/assessments/history/` - Get user's results
- `GET /api/assessments/{id}/` - Get specific result

### Career Paths
- `GET /api/careers/` - List all career paths
- `GET /api/careers/{id}/` - Get career details

### Admin
- `GET /api/admin/stats/` - Get statistics

## Default Users

After running `seed_data`, you can:
- Access Django admin at `/admin/`
- Create admin users for managing the system

## Project Structure

```
career-counseling/
├── backend/
│   ├── core/           # Django project settings
│   ├── accounts/       # User authentication
│   ├── assessments/    # Questions, results, career paths
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Environment Variables

Create `.env` file in backend directory:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=*
```

## License

MIT