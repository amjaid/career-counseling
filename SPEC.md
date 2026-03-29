# Career Counseling System - Specification

## Project Overview
- **Name:** Career Guidance System
- **Type:** Full-stack web application
- **Stack:** Django 5 + DRF (backend), React 18 + Vite (frontend)
- **Core Functionality:** Career assessment quiz for students with personalized career recommendations

## Features

### User Roles
1. **Student** - Take assessments, view results, get recommendations
2. **Admin** - Manage questions, view all results, manage users

### Core Features
1. **User Authentication**
   - Register/Login (JWT tokens)
   - Student profile management
   
2. **Career Assessment Quiz**
   - Multiple-choice questions
   - Categories: Interests, Skills, Personality, Values
   - Progress tracking
   - Timer (optional)

3. **Scoring & Recommendations**
   - Calculate scores by category
   - Match with career paths
   - Show top 3 recommended careers
   - Detailed career descriptions

4. **Results & History**
   - View past assessment results
   - Compare results over time
   - Export results (PDF/CSV)

5. **Admin Dashboard**
   - Manage questions (CRUD)
   - View all student results
   - Manage career paths
   - View statistics

### Assessment Categories
1. **Interests** - What activities do you enjoy?
2. **Skills** - What are you good at?
3. **Personality** - How do you work best?
4. **Values** - What's important to you in a career?

### Career Paths (Examples)
- Software Engineering
- Data Science
- Web Development
- Mobile App Development
- Machine Learning/AI
- Cybersecurity
- Cloud Computing
- DevOps
- UI/UX Design
- Product Management

## Database Models

### User
- id, username, email, password, role (student/admin), created_at

### Question
- id, category, question_text, options (JSON), correct_score (JSON), order, is_active

### CareerPath
- id, name, description, required_scores (JSON), growth_outlook, salary_range

### StudentProfile
- id, user (FK), full_name, education_level, field_of_study

### AssessmentResult
- id, student (FK), scores (JSON), recommended_careers (JSON), completed_at

## API Endpoints

### Auth
- POST /api/auth/register/
- POST /api/auth/login/
- GET /api/auth/me/

### Questions
- GET /api/questions/ - List all questions
- GET /api/questions/?category=interests - Filter by category

### Assessments
- POST /api/assessments/submit/ - Submit answers, get results
- GET /api/assessments/history/ - Get student's past results
- GET /api/assessments/{id}/ - Get specific result

### Career Paths
- GET /api/careers/ - List all career paths
- GET /api/careers/{id}/ - Get career details

### Admin
- GET/POST/PUT/DELETE /api/admin/questions/
- GET /api/admin/results/ - All student results
- GET /api/admin/stats/ - Statistics

## UI/UX Design

### Color Palette
- Primary: #4F46E5 (Indigo)
- Secondary: #10B981 (Emerald)
- Background: #0F172A (Dark slate)
- Surface: #1E293B
- Text: #F8FAFC
- Accent: #06B6D4 (Cyan)

### Pages
1. Landing Page - Hero, Features, CTA
2. Login/Register - Forms with validation
3. Dashboard - Progress, Start Assessment, View Results
4. Assessment - Question by question or all at once
5. Results - Scores, Recommendations, Details
6. Profile - User info, History
7. Admin - Dashboard, Questions, Results

### Animations
- Framer Motion for transitions
- Progress bar animation
- Score reveal animations
- Card hover effects

## Acceptance Criteria
- [ ] Students can register and login
- [ ] Students can take assessment quiz
- [ ] Results show personalized career recommendations
- [ ] Students can view their assessment history
- [ ] Admins can manage questions
- [ ] Admins can view all student results
- [ ] Responsive design works on all devices
- [ ] API handles errors gracefully