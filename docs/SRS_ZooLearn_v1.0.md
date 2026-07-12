# Software Requirements Specification (SRS)

## Project Information

  Item            Details
  --------------- -------------------------------------
  Project Name    ZooLearn
  Version         1.0
  Document Type   Software Requirements Specification
  Website         https://zoolearn.in
  Frontend        Next.js
  Backend         Supabase
  Database        PostgreSQL
  Image Storage   Cloudinary
  Deployment      AWS

------------------------------------------------------------------------

# 1. Introduction

## 1.1 Purpose

This document defines the functional and non-functional software
requirements for ZooLearn. It serves as the technical reference for
designing, developing, testing, deploying, and maintaining the platform.

## 1.2 Scope

ZooLearn is a biology learning platform that enables students to access
structured learning content, interactive 3D models, quizzes, and
progress tracking through a modern web application.

------------------------------------------------------------------------

# 2. Overall Description

## Product Perspective

ZooLearn consists of:

-   Next.js Frontend
-   Supabase Backend
-   PostgreSQL Database
-   Cloudinary Image Storage
-   AWS Hosting

## User Class

### Student

The student can:

-   Register
-   Login
-   Browse Courses
-   View Lessons
-   Attempt Quizzes
-   Track Learning Progress

------------------------------------------------------------------------

# 3. Functional Requirements

## FR-01 Authentication

The system shall:

-   Register users
-   Authenticate users
-   Allow password reset
-   Maintain secure sessions

## FR-02 Course Management

The system shall:

-   Display all courses
-   Display course details
-   Organize courses by category
-   Allow course search

## FR-03 Lesson Management

The system shall:

-   Display lesson content
-   Display images
-   Display videos
-   Display interactive 3D models

## FR-04 Quiz System

The system shall:

-   Display MCQ quizzes
-   Evaluate answers
-   Calculate scores
-   Display quiz results

## FR-05 Progress Tracking

The system shall:

-   Save completed lessons
-   Save quiz scores
-   Display learning progress

## FR-06 Search

The system shall allow searching by:

-   Course
-   Lesson
-   Topic

------------------------------------------------------------------------

# 4. Non-Functional Requirements

## Performance

-   Initial page load under 3 seconds
-   Lazy loading
-   Optimized assets

## Scalability

The platform should support:

-   1,000+ users
-   Hundreds of courses
-   Thousands of lessons

## Security

-   HTTPS
-   Supabase Authentication
-   Row Level Security (RLS)
-   Secure environment variables

## Reliability

-   Automatic backups
-   Graceful error handling
-   Error logging

## Availability

Target uptime: 99.9%

------------------------------------------------------------------------

# 5. External Interfaces

## User Interface

Responsive support for:

-   Desktop
-   Tablet
-   Mobile

## Database

-   PostgreSQL

## Image Storage

-   Cloudinary

------------------------------------------------------------------------

# 6. Database Modules

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

## Deployment

-   AWS

------------------------------------------------------------------------

# 8. Assumptions

-   Stable internet connection
-   Modern browser support
-   Responsive design
-   Cloud services available

------------------------------------------------------------------------

# 9. Constraints

-   Backend powered by Supabase
-   PostgreSQL database
-   Cloudinary for image hosting
-   AWS deployment
-   GitHub for version control

------------------------------------------------------------------------

# 10. Acceptance Criteria

The system will be accepted when:

-   Users can register and log in successfully.
-   Courses are displayed correctly.
-   Lessons load successfully.
-   Quizzes evaluate correctly.
-   Progress is stored accurately.
-   Images load correctly from Cloudinary.
-   The application is responsive across desktop, tablet, and mobile.
-   The application is deployed successfully on AWS.

------------------------------------------------------------------------

# 11. Future Scope

-   AI Learning Assistant
-   Personalized Learning Paths
-   Gamification
-   Mobile Application
-   Certificates
-   Learning Analytics
-   Offline Learning
-   Multi-language Support
