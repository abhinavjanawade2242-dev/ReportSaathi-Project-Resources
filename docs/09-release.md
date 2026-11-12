# ReportSaathi – Release Readiness and Deployment Plan

**Document:** Stage 10 – Release  
**Owner:** Person 1 – Product Strategy & Design Lead  
**Technical Coordination:** Person 2 – Systems & DevOps Lead  
**QA Coordination:** Person 3 – Quality & Engineering Lead  
**Status:** Draft – Pending Team Approval, Implementation and QA Verification

## 1. Objective

This document defines the proposed release-readiness, deployment, infrastructure, security, monitoring and recovery requirements for ReportSaathi.

The purpose is to ensure that the application is reviewed, tested, secured and prepared before production deployment.

## 2. Proposed Technology Stack

| Component | Proposed Technology |
|---|---|
| Frontend | React |
| Backend | Python FastAPI |
| Request validation | Pydantic |
| OCR | Tesseract OCR |
| AI explanation | Gemini API |
| Database | Supabase/PostgreSQL (optional) |
| Version control | Git and GitHub |
| Frontend hosting | Cloudflare Pages |
| Backend hosting | Render |
| CI/CD | GitHub Actions |
| API documentation | FastAPI Swagger UI (`/docs`) |

All technologies and hosting choices remain proposed until approved and verified during implementation.

## 3. Proposed Deployment Architecture

The proposed application deployment flow is:

1. Users access the ReportSaathi frontend.
2. The frontend communicates with the FastAPI backend through HTTPS APIs.
3. The backend validates uploaded documents and processes OCR.
4. Deterministic safety checks run before AI explanation.
5. The backend communicates with the Gemini API when required.
6. Validated explanations are returned to the frontend.
7. Optional database storage is used only if approved by the team.

## 4. Infrastructure Readiness

The following infrastructure requirements must be completed before deployment:

- GitHub repository and branch permissions configured.
- Frontend build and backend startup verified.
- Required Python and frontend dependencies documented.
- Backend API endpoints verified.
- Frontend-to-backend communication tested.
- CORS configured for approved frontend domains.
- HTTPS enabled.
- Environment variables configured in hosting platforms.
- Upload size and file-type restrictions enforced.
- Health endpoint verified.

## 5. Environment Variables and Secret Management

### Frontend configuration

- `VITE_API_URL`
- `VITE_SUPABASE_URL` (if Supabase is approved)
- `VITE_SUPABASE_ANON_KEY` (if Supabase is approved)

Frontend variables prefixed with `VITE_` are exposed to browser code. They must never contain private API keys or service-role credentials. Supabase access must be protected using appropriate database policies such as Row Level Security.

### Backend configuration

- `FRONTEND_URL`
- `DATABASE_URL` (if a database is approved)
- `GEMINI_API_KEY`
- `SERVICE_KEY` (only if required by the approved implementation)
- `TELEGRAM_BOT_TOKEN` (only if Telegram integration is approved)

Private credentials must be stored securely in backend hosting environment settings. They must not be committed to GitHub or exposed in frontend code.

## 6. CI/CD and Deployment Process

GitHub Actions is the proposed CI/CD tool.

The intended workflow is:

1. Developer pushes changes to the approved GitHub branch.
2. Automated checks and tests run.
3. Frontend build is verified.
4. Backend tests and validation checks run.
5. Failed checks must be resolved before release.
6. Approved changes are deployed to the hosting platforms.
7. Deployment health is verified.

Automatic production deployment must be enabled only after the team approves the deployment workflow.

## 7. Backup and Recovery Strategy

The final backup and recovery policy depends on the database decision.

If Supabase/PostgreSQL is approved:

- Define database backup frequency.
- Define backup retention.
- Restrict access to backups.
- Test restoration before production release.
- Document recovery responsibilities.

If temporary processing is selected:

- Avoid unnecessary permanent storage of medical documents.
- Define recovery expectations for application configuration and source code.
- Document the temporary-file deletion process.

**Status:** Pending database and team approval.

## 8. Privacy and Data Retention

Before production release:

- Define the approved document retention period.
- Define temporary-file deletion behavior.
- Ensure medical report contents are excluded from application logs and analytics.
- Restrict access to patient information.
- Use secure communication.
- Confirm authentication and authorization requirements.
- Document user consent and privacy information.
- Verify that deletion behavior works as intended.

**Status:** Retention period and deletion procedure pending approval.

## 9. Monitoring and Incident Response

The application should monitor:

- Backend API availability.
- OCR processing failures.
- AI service failures.
- Application errors.
- Deployment failures.
- Medical safety incidents.
- Unexpected service downtime.

Monitoring and analytics must not expose medical report contents or personal health information.

An incident-response procedure should define how issues are reported, investigated, resolved and communicated.

**Status:** Monitoring tools and incident-response procedure pending approval and implementation.

## 10. Testing and QA Release Requirements

The following checks are required before production release:

- Functional testing.
- API testing.
- Frontend and backend integration testing.
- Upload and OCR testing.
- AI explanation testing.
- Language and translation testing.
- Medical safety testing.
- Privacy and security testing.
- Error-handling and failure testing.
- Deployment verification.

Medical safety checks must confirm that the application does not diagnose, prescribe, modify medication instructions or invent laboratory reference ranges.

Red-flag rules must be reviewed and approved by qualified medical professionals before production release.

**Test execution results:** Pending Person 3.

**Known issues:** Pending Person 3.

**QA approval:** Pending Person 3.

## 11. Release Responsibilities

| Role | Responsibility |
|---|---|
| Person 1 | Product coordination, release documentation and release approval coordination |
| Person 2 | Architecture, API coordination, infrastructure, deployment, CI/CD and monitoring coordination |
| Person 3 | Functional testing, integration testing, QA verification and acceptance criteria |

Final responsibilities must be confirmed by the team.

## 12. Release Readiness Checklist

### Documentation and approval
- [ ] MVP scope approved.
- [ ] Architecture and API contracts approved.
- [ ] Safety rules reviewed.
- [ ] Environment configuration documented.
- [ ] Deployment plan approved.

### Implementation
- [ ] Frontend and backend integrated.
- [ ] Required dependencies installed.
- [ ] API endpoints verified.
- [ ] Environment variables configured securely.
- [ ] Hosting configuration verified.

### Testing and security
- [ ] Functional tests passed.
- [ ] Integration tests passed.
- [ ] OCR and AI tests passed.
- [ ] Medical safety tests passed.
- [ ] Privacy and security checks passed.
- [ ] Qualified medical review completed.

### Deployment
- [ ] CI/CD workflow verified.
- [ ] Production deployment approved.
- [ ] HTTPS verified.
- [ ] Health endpoint verified.
- [ ] Monitoring configured.
- [ ] Backup and recovery process verified, if applicable.

## 13. Pending Decisions

The following decisions require team confirmation:

1. Final hosting platform approval.
2. Database selection.
3. Authentication and authorization requirements.
4. Environment-variable configuration.
5. Document retention period.
6. Temporary-file deletion procedure.
7. Backup and recovery policy.
8. Monitoring tools and incident-response process.
9. Final deployment responsibility allocation.
10. QA acceptance and medical review approval.

## 14. Release Approval

Production release must take place only after:

- Required MVP functionality is implemented.
- QA testing and acceptance criteria are satisfied.
- Medical safety and privacy requirements are verified.
- Qualified medical review of red-flag rules is completed.
- Deployment and recovery requirements are approved.

**Current release status:** Not yet approved for production.

This document will be updated as implementation, testing and team approvals are completed.