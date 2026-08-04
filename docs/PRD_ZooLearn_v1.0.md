# Product Requirements Document (PRD)

**Project Name:** ZooLearn\
**Version:** 1.0\
**Project Type:** Biology Learning Platform (LMS)\
**Website:** https://zoolearn.in\
**Frontend:** Next.js\
**Backend:** Supabase\
**Database:** PostgreSQL\
**Image Storage:** Cloudinary\
**Deployment:** AWS\
**Version Control:** Git & GitHub

------------------------------------------------------------------------

# 1. Executive Summary

ZooLearn is a modern biology learning platform designed to make
biological sciences easier to understand through structured content,
interactive 3D visualizations, quizzes, and progress tracking.

The platform focuses on providing an engaging and scalable learning
experience while allowing educational content to be managed efficiently
through a backend-driven architecture.

------------------------------------------------------------------------

# 2. Problem Statement

Current biology learning platforms often suffer from:

-   Static learning materials
-   Limited visualization
-   Poor interactivity
-   Lack of structured progress tracking
-   Difficult content management

ZooLearn addresses these challenges through a modern, scalable, and
interactive learning platform.

------------------------------------------------------------------------

# 3. Goals

## Student Goals

-   Learn biology through interactive content.
-   Track learning progress.
-   Practice quizzes.
-   Access learning content from any device.

------------------------------------------------------------------------

# 4. Target Users

-   School Students
-   College Students
-   Biology Enthusiasts

------------------------------------------------------------------------

# 5. Core Features

## Authentication

-   Email Login
-   Password Reset
-   User Profiles

## Course Management

-   Browse Courses
-   Search Courses
-   Categories
-   Course Details
-   Continue Learning

## Lesson Module

Each lesson supports:

-   Text Content
-   Images
-   Videos
-   Interactive 3D Models

## Quiz Module

-   Multiple Choice Questions
-   Instant Results
-   Score Calculation
-   Answer Review

## Progress Tracking

Students can:

-   View completed lessons
-   Track learning progress
-   View quiz scores
-   Continue learning

## Search

Search by:

-   Topic
-   Course
-   Category

------------------------------------------------------------------------

# 6. Non-Functional Requirements

## Performance

-   Initial page load under 3 seconds
-   Optimized images
-   Lazy loading
-   Server-side rendering

## Security

-   Supabase Authentication
-   Row Level Security (RLS)
-   Secure API access
-   Environment variable protection

## Scalability

The platform should support:

-   1,000+ users
-   Hundreds of courses
-   Thousands of lessons
-   Future feature expansion

------------------------------------------------------------------------

# 7. Technology Stack

## Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS

## Backend

-   Supabase

## Database

-   PostgreSQL

## Image Storage

-   Cloudinary

## Authentication

-   Supabase Auth

## Deployment

-   AWS EC2
-   AWS S3

## Version Control

-   Git
-   GitHub

------------------------------------------------------------------------

# 8. High-Level Architecture

``` text
Students
      │
      ▼
Next.js Frontend
      │
      ▼
Supabase Backend
├── PostgreSQL
├── Authentication
└── Edge Functions
      │
      ├── Cloudinary (Images)
      ▼
AWS Hosting
```

------------------------------------------------------------------------

# 9. Database Modules

-   Users
-   Categories
-   Courses
-   Lessons
-   Quizzes
-   Quiz Attempts
-   Progress
-   Reviews
-   Notifications
-   Bookmarks

------------------------------------------------------------------------

# 10. User Roles

## Student

-   Register
-   Login
-   Browse Courses
-   Learn
-   Take Quizzes
-   Track Progress

------------------------------------------------------------------------

# 11. Project Milestones

  Phase      Deliverable
  ---------- -----------------------------------
  Phase 1    GitHub Repository & Project Setup
  Phase 2    Supabase Configuration
  Phase 3    Database Design
  Phase 4    Authentication
  Phase 5    Course Module
  Phase 6    Lesson Module
  Phase 7    Quiz Module
  Phase 8    SEO Optimization
  Phase 9    Testing
  Phase 10   AWS Deployment

------------------------------------------------------------------------

# 12. Deliverables

-   Responsive Web Application
-   Authentication System
-   Course Management
-   Lesson Management
-   Quiz System
-   Progress Tracking
-   SEO Optimization
-   Deployment Documentation
-   Technical Documentation

------------------------------------------------------------------------

# 13. Future Enhancements

-   AI Learning Assistant
-   Personalized Learning Paths
-   Gamification (Badges, Streaks, Leaderboards)
-   Discussion Forum
-   Live Classes
-   Mobile Application (Android & iOS)
-   Offline Learning
-   Multi-language Support
-   Certificates
-   Learning Analytics
