# System Architecture Document

## Project Information

  Item            Details
  --------------- ------------
  Project         ZooLearn
  Version         1.0
  Frontend        Next.js
  Backend         Supabase
  Database        PostgreSQL
  Image Storage   Cloudinary
  Deployment      AWS

------------------------------------------------------------------------

# 1. Overview

ZooLearn follows a modern backend-driven architecture where the frontend
is responsible for rendering the user interface while all application
data is managed by Supabase. Images are stored in Cloudinary and the
application is deployed on AWS.

------------------------------------------------------------------------

# 2. High-Level Architecture

``` text
                 Users
                    │
                    ▼
          Next.js Frontend
                    │
         Supabase JavaScript SDK
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
 PostgreSQL   Authentication  Edge Functions
        │
        ▼
    Cloudinary
      (Images)
        │
        ▼
     AWS Hosting
```

------------------------------------------------------------------------

# 3. Architecture Components

## Frontend

-   Next.js
-   TypeScript
-   Tailwind CSS
-   Responsive UI
-   Server-side rendering where applicable

Responsibilities:

-   Render UI
-   Fetch data from Supabase
-   Handle authentication state
-   Display courses, lessons, quizzes and progress

------------------------------------------------------------------------

## Backend

Supabase provides:

-   PostgreSQL Database
-   Authentication
-   Row Level Security (RLS)
-   Edge Functions

Responsibilities:

-   Data storage
-   User authentication
-   Business logic
-   Secure API access

------------------------------------------------------------------------

## Database

Main modules:

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

## Image Storage

Cloudinary stores:

-   Course thumbnails
-   Lesson images
-   Other media assets

Only image URLs are stored in PostgreSQL.

------------------------------------------------------------------------

## Deployment

AWS hosts the production application.

Components:

-   EC2
-   S3
-   Future: CloudFront

------------------------------------------------------------------------

# 4. Request Flow

``` text
User
 │
 ▼
Next.js
 │
 ▼
Supabase
 │
 ├── PostgreSQL
 ├── Authentication
 └── Edge Functions
 │
 ▼
Response
 │
 ▼
User Interface
```

------------------------------------------------------------------------

# 5. Security Architecture

-   HTTPS
-   Supabase Authentication
-   Row Level Security (RLS)
-   Environment Variables
-   JWT-based session management

------------------------------------------------------------------------

# 6. Scalability

Initial target:

-   1,000+ users
-   Hundreds of courses
-   Thousands of lessons

The architecture can be expanded by adding caching, CDN, analytics, and
additional backend services as required.

------------------------------------------------------------------------

# 7. Folder Structure

zoolearn-platform/
│
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── contact/
│   │   ├── courses/
│   │   ├── categories/
│   │   ├── search/
│   │   └── quiz/
│   │
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── progress/
│   │   ├── bookmarks/
│   │   └── profile/
│   │
│   ├── api/
│   │
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navbar/
│   ├── footer/
│   ├── cards/
│   ├── course/
│   ├── lesson/
│   ├── quiz/
│   ├── forms/
│   └── common/
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   │
│   ├── cloudinary.ts
│   ├── constants.ts
│   ├── helpers.ts
│   └── validators.ts
│
├── services/
│   ├── auth.service.ts
│   ├── course.service.ts
│   ├── lesson.service.ts
│   ├── quiz.service.ts
│   ├── progress.service.ts
│   └── search.service.ts
│
├── hooks/
│
├── context/
│
├── types/
│
├── utils/
│
├── public/
│   ├── images/
│   ├── icons/
│   ├── logos/
│   ├── favicon.ico
│   └── robots.txt
│
├── styles/
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
│
├── docs/
│   ├── 01-PRD.md
│   ├── 02-SRS.md
│   ├── 03-ARCHITECTURE.md
│   ├── 04-DATABASE.md
│   ├── 05-API.md
│   ├── 06-KT.md
│   ├── 07-DEPLOYMENT.md
│   ├── 08-CONTRIBUTING.md
│   └── README.md
│
├── tests/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── eslint.config.js
├── README.md
└── LICENSE

------------------------------------------------------------------------

# 8. Future Architecture

Future enhancements may include:

-   AI-powered learning assistant
-   Mobile application
-   Analytics dashboard
-   Gamification
-   Multi-language support
