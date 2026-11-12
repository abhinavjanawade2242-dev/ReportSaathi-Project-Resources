
# ReportSaathi – System Architecture

**Project Name:** ReportSaathi  
**Document:** System Architecture  
**Version:** 1.0  
**Status:** Proposed

---

## 1. Introduction

This document describes the technical architecture of ReportSaathi, an AI-assisted healthcare application designed to explain medical reports, laboratory results, prescriptions and discharge summaries in simple language.

The architecture separates the frontend, backend, OCR processing, AI services and data storage to improve maintainability, security and scalability.

## 2. Architecture Overview

ReportSaathi follows a client-server architecture.

The frontend provides the user interface, while the backend handles document processing, OCR, safety validation and AI communication.

### Main Components

1. Frontend – User interface and document upload.
2. Backend API – Request handling and application logic.
3. OCR Engine – Extracts text from uploaded documents.
4. Safety Validation Module – Checks extracted information for predefined warning conditions.
5. AI Service – Generates simplified explanations.
6. Database / Storage – Stores permitted user and application data, if required.
7. Monitoring – Tracks application errors and performance.

## 3. Technology Stack

| Component | Proposed Technology | Purpose |
|---|---|---|
| Frontend | React.js | User interface |
| Frontend styling | HTML, CSS, JavaScript | Responsive design |
| Backend | Python FastAPI | API development |
| Data validation | Pydantic | Request and response validation |
| OCR | Tesseract OCR | Extract text from documents |
| AI | Gemini API | Simplified explanations |
| Database | Supabase PostgreSQL (if required) | Structured data storage |
| Version control | Git and GitHub | Source code management |
| Frontend hosting | Cloudflare Pages | Frontend deployment |
| Backend hosting | Render | API hosting |
| CI/CD | GitHub Actions | Automated testing and deployment |

The final stack will be confirmed based on team requirements, cost, privacy and deployment feasibility.

## 4. High-Level System Workflow

The expected application workflow is:

1. User opens ReportSaathi.
2. User uploads a medical document.
3. Frontend validates the file type and size.
4. Frontend sends the document securely to the backend API.
5. Backend validates the request.
6. OCR extracts text from the document.
7. Extracted information is validated and checked for predefined safety warnings.
8. Relevant, validated information is sent to the AI service.
9. AI generates a simplified explanation.
10. Backend validates the response and applies safety restrictions.
11. Frontend displays the explanation and relevant warnings to the user.

## 5. Architecture Diagram

```text
+----------------------------+
|       PATIENT / USER       |
+-------------+--------------+
              |
              v
+----------------------------+
|       REACT FRONTEND       |
|                            |
| - Login / Registration     |
| - Document Upload          |
| - Results Dashboard        |
| - Language Selection       |
+-------------+--------------+
              |
              | HTTPS / REST API
              v
+----------------------------+
|       FASTAPI BACKEND      |
|                            |
| - Authentication           |
| - File Validation          |
| - Request Handling         |
| - API Response Management |
+-------------+--------------+
              |
              v
+----------------------------+
|       OCR PROCESSING       |
|                            |
| - Tesseract OCR             |
| - Text Extraction          |
| - Data Validation          |
+-------------+--------------+
              |
              v
+----------------------------+
|     SAFETY VALIDATION      |
|                            |
| - Red-Flag Rules           |
| - Reference Range Checks   |
| - Prescription Restrictions|
+-------------+--------------+
              |
              v
+----------------------------+
|       GEMINI AI API        |
|                            |
| - Simple Explanations      |
| - Multilingual Output      |
| - Doctor Questions         |
+-------------+--------------+
              |
              v
+----------------------------+
|     RESPONSE VALIDATION    |
+-------------+--------------+
              |
              v
+----------------------------+
|      REACT FRONTEND        |
|                            |
| - Medical Explanation     |
| - Warnings                |
| - Doctor Questions        |
+----------------------------+
```

## 6. Frontend Architecture

The frontend is responsible for user interaction and presentation.

### Main Modules

- Authentication pages.
- Patient dashboard.
- Medical document upload interface.
- Document processing status.
- Explanation results page.
- Language selection.
- Doctor question display.
- Administrator dashboard.

### Frontend Responsibilities

- Validate basic file requirements.
- Send API requests to the backend.
- Display loading and error states.
- Show extracted text and AI explanations.
- Avoid storing private API keys in browser code.

## 7. Backend Architecture

FastAPI will provide REST APIs for the application.

### Backend Responsibilities

- Receive document uploads.
- Validate file type, size and request data.
- Process documents using OCR.
- Execute deterministic safety checks.
- Communicate with the AI service.
- Validate AI-generated responses.
- Handle authentication and authorization.
- Return structured API responses.
- Manage permitted data storage.

### Proposed API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/health | Check backend health |
| POST | /api/upload | Upload a medical document |
| POST | /api/extract | Extract document text |
| POST | /api/explain | Generate simplified explanation |
| POST | /api/translate | Translate explanation |
| POST | /api/questions | Generate doctor questions |
| GET | /api/history | Retrieve permitted user history |
| POST | /api/feedback | Submit user feedback |

These are proposed endpoints; they must be implemented and tested before being treated as available.

## 8. OCR Processing Architecture

Tesseract OCR will be used to extract text from supported image documents.

Processing steps:

1. Receive the uploaded document.
2. Check file format and size.
3. Convert supported pages into images when necessary.
4. Apply image preprocessing where appropriate.
5. Extract text using Tesseract.
6. Validate extracted text and identify uncertain fields.
7. Allow users to review extracted information when necessary.

Scanned documents with poor image quality may require additional processing or user correction.

## 9. AI Integration Architecture

The backend will communicate with the Gemini API.

The AI service will be used to:

- Explain medical terminology.
- Simplify laboratory report information.
- Clarify existing prescription instructions.
- Translate explanations.
- Generate questions for healthcare professionals.

### AI Safety Restrictions

The AI must not:

- Diagnose medical conditions.
- Prescribe medication.
- Change medication dosages.
- Recommend stopping medication.
- Invent laboratory reference ranges.
- Provide false reassurance about urgent warning signs.

API keys must remain on the backend and must never be exposed in frontend code.

## 10. Data Storage Architecture

Database integration will be decided according to the final MVP requirements.

If persistent storage is required, Supabase PostgreSQL may be used for:

- User account information.
- Application metadata.
- User preferences.
- Feedback records.
- Authorized document-processing history.

Medical document storage should be minimized. Temporary processing should be preferred where persistent storage is unnecessary.

Sensitive medical content must not be sent to analytics services.

## 11. Security Architecture

The application should implement:

- HTTPS for production communication.
- Secure authentication and authorization.
- File type and size validation.
- Server-side API key management.
- Access controls for user data.
- Secure handling and deletion of temporary files.
- Rate limiting and abuse protection.
- Restricted application logging.
- Privacy-conscious error monitoring.

## 12. Deployment Architecture

The proposed deployment setup is:

- Frontend: Cloudflare Pages.
- Backend: Render.
- Source code: GitHub.
- Automated workflows: GitHub Actions.
- Database: Supabase PostgreSQL, if required.

### Deployment Flow

```text
Developer
    |
    v
GitHub Repository
    |
    v
GitHub Actions
    |
    +------> Frontend Deployment
    |        Cloudflare Pages
    |
    +------> Backend Deployment
             Render
                  |
                  v
             FastAPI Service
```

Production deployment must use environment variables for sensitive configuration.

## 13. Environment Variables

| Variable | Purpose | Visibility |
|---|---|---|
| VITE_API_URL | Backend API URL | Public |
| VITE_SUPABASE_URL | Supabase project URL, if used | Public |
| VITE_SUPABASE_ANON_KEY | Supabase public client key, if used | Public, with proper access policies |
| FRONTEND_URL | Allowed frontend origin | Backend only |
| DATABASE_URL | Database connection | Private |
| GEMINI_API_KEY | AI service authentication | Private |
| SERVICE_KEY | Privileged service credential, if required | Private |
| TELEGRAM_BOT_TOKEN | Telegram integration, if used | Private |

Private environment variables must never be committed to GitHub.

## 14. Scalability and Maintainability

The system should support:

- Independent frontend and backend development.
- Reusable API components.
- Modular OCR and AI services.
- Future language additions.
- Additional document formats.
- Automated testing and deployment.
- Centralized error monitoring.

## 15. Conclusion

The proposed ReportSaathi architecture separates presentation, document processing, safety validation and AI generation.

This structure aims to provide a maintainable and secure foundation for the MVP while allowing future enhancements.

The architecture remains subject to implementation testing, privacy review and team approval.
```

## Step 3: Save and verify

Press `Ctrl + S`.

In PowerShell:

```powershell
git status
```

You should see:

```text
docs/06-architecture.md
```

## What this document achieves

You have now documented:

- How frontend and backend communicate.
- Why FastAPI is used.
- How OCR extracts report information.
- Where safety checks happen.
- How Gemini generates explanations.
- How the application will be deployed.
- How private API keys are protected.

**Important:** This is a proposed architecture, not proof that these components are already implemented. Also, because the project is still deciding whether it needs a database, Supabase remains optional.

Next, we'll create `docs/06b-safety-rules.md`, which is particularly important for a healthcare AI project.