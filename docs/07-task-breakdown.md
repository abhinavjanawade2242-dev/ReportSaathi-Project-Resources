# ReportSaathi — Stage 7: Task Breakdown

**Stage:** 7 — Task Breakdown  
**Owner:** Person 1 — Product Strategy & Design Lead  
**Status:** Draft — Pending Team Review and Confirmation  
**Version:** 1.0

## 1. Purpose

This document breaks the proposed ReportSaathi MVP into manageable development, integration, testing and release-preparation tasks.

It identifies priorities, dependencies, expected deliverables, suggested responsibility areas and completion criteria.

This document is a planning document. Listing a task does not mean that it has been implemented or tested.

## 2. Project Objective

ReportSaathi helps patients and caregivers understand medical reports and prescriptions through clear, accessible, multilingual educational explanations.

The application must preserve medical information accurately, identify unclear OCR results, use only reference ranges printed on uploaded reports, and follow the project's medical safety rules.

It must not diagnose diseases or recommend medication changes.

## 3. Priority Definitions

| Priority | Meaning |
|---|---|
| P0 — Critical | Required for a safe and functional MVP |
| P1 — High | Required for the agreed MVP experience or quality |
| P2 — Later | Optional or post-MVP enhancement |

## 4. Task Breakdown

### 4.1 Product, UI/UX and Frontend

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| UI-01 | Finalize supported languages and reading-level options | P0 | Team confirmation | Approved language and reading-level specification |
| UI-02 | Finalize user journey and screen navigation | P0 | Scope and design review | Approved user-flow diagram |
| UI-03 | Implement language selection screen | P0 | UI-01 | Functional language selector |
| UI-04 | Implement medical document upload interface | P0 | UI-02 | Upload screen with validation feedback |
| UI-05 | Implement OCR processing and loading states | P0 | OCR API | Processing interface |
| UI-06 | Display extracted information for manual verification | P0 | OCR API | Editable verification screen |
| UI-07 | Implement medical explanation results screen | P0 | Explanation API | Explanation interface |
| UI-08 | Display printed reference ranges and unclear values correctly | P0 | OCR and explanation APIs | Lab-value presentation |
| UI-09 | Display deterministic safety warnings and disclaimer | P0 | Safety API/backend | Warning and disclaimer interface |
| UI-10 | Implement translation interface | P1 | Translation API | Translated explanation display |
| UI-11 | Implement doctor-question screen | P1 | Questions API | Doctor-question interface |
| UI-12 | Implement patient registration and login screens | P0 if authentication remains in MVP | Authentication decision and API | Authentication interface |
| UI-13 | Implement basic administrator dashboard | P1 | PRD confirmation and admin access design | Administrator monitoring interface |
| UI-14 | Implement feedback submission interface | P1 if feedback remains in MVP | Feedback API | Feedback interface |
| UI-15 | Implement save/share functionality | P2 unless approved for MVP | Team decision and privacy review | Approved save/share workflow |
| UI-16 | Implement accessible layouts and responsive behavior | P1 | Screen designs | Desktop and mobile layouts |

**Responsibility note:** Person 1 leads product requirements, screen design and UI/UX coordination. The person responsible for frontend implementation must be explicitly confirmed by the team.

### 4.2 Document Upload and OCR

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| OCR-01 | Configure supported upload formats: PDF, JPG, JPEG and PNG | P0 | Upload API | File-format validation |
| OCR-02 | Confirm and implement maximum upload size | P0 | Team decision: 10 MB or 25 MB | Agreed size validation |
| OCR-03 | Validate empty, malformed and unsupported files | P0 | OCR-01 | Upload validation |
| OCR-04 | Implement secure temporary document storage | P0 | Upload API and retention policy | Temporary document handling |
| OCR-05 | Implement image preprocessing where required | P0 | OCR engine selection | Preprocessing module |
| OCR-06 | Implement Tesseract-based text extraction | P0 | OCR-05 | OCR extraction module |
| OCR-07 | Identify unclear or incomplete extracted information | P0 | OCR-06 | OCR uncertainty detection |
| OCR-08 | Preserve original medical values, units and printed ranges | P0 | OCR-06 | Structured extraction output |
| OCR-09 | Implement manual correction submission | P0 | Verification interface and API contract | Correction workflow |
| OCR-10 | Delete temporary files and extracted text according to the approved retention policy | P0 | OCR-04 and retention decision | Deletion mechanism |

### 4.3 Medical Explanation and AI Integration

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| AI-01 | Configure backend AI service integration | P0 | AI provider and API configuration | Backend AI service |
| AI-02 | Store API keys in backend environment variables | P0 | Backend setup | Secure configuration |
| AI-03 | Generate plain-language report explanations | P0 | OCR verification | Explanation endpoint |
| AI-04 | Explain medical terms without diagnosing | P0 | AI-03 and safety rules | Safe explanation behavior |
| AI-05 | Compare results only with printed reference ranges | P0 | OCR-08 | Range-comparison logic |
| AI-06 | Handle missing or unclear reference ranges | P0 | OCR-08 | Uncertainty handling |
| AI-07 | Preserve prescription names, dosage, frequency and duration | P0 | AI-03 and safety rules | Prescription-safe explanation |
| AI-08 | Implement translation into approved languages | P1 | UI-01 and AI service | Translation endpoint |
| AI-09 | Generate approximately 3–4 doctor questions | P1 | Explanation API | Questions endpoint |
| AI-10 | Validate AI responses before displaying them | P0 | Safety validation rules | AI output validator |
| AI-11 | Implement safe fallback messages for AI failures | P0 | AI-10 | Fallback response handling |
| AI-12 | Include the medical disclaimer with explanations | P0 | Explanation interface | Disclaimer display |

### 4.4 Medical Safety and Privacy

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| SAFE-01 | Implement deterministic red-flag rules | P0 | Approved rules and medical review | Backend safety rules |
| SAFE-02 | Execute red-flag checks before AI explanation generation | P0 | SAFE-01 and AI integration | Correct processing sequence |
| SAFE-03 | Preserve urgent warnings when AI is unavailable | P0 | SAFE-01 and fallback handling | Persistent safety warning |
| SAFE-04 | Block diagnosis and disease-prediction responses | P0 | AI-10 | Diagnosis restriction |
| SAFE-05 | Block medication-change recommendations | P0 | AI-10 | Prescription safety validation |
| SAFE-06 | Prevent invented laboratory values and reference ranges | P0 | OCR and AI validation | Value and range validation |
| SAFE-07 | Protect medical information from unauthorized access | P0 | Authentication and access-control decisions | Access-control implementation |
| SAFE-08 | Prevent medical report contents from appearing in logs or analytics | P0 | Backend logging configuration | Privacy-conscious logging |
| SAFE-09 | Validate uploaded files and treat extracted text as untrusted input | P0 | OCR-01 and OCR-06 | Input validation |
| SAFE-10 | Configure HTTPS for deployed environments | P0 | Deployment setup | Secure communication |
| SAFE-11 | Define consent and temporary-data retention requirements | P0 | Team and privacy review | Approved privacy policy |
| SAFE-12 | Arrange qualified medical-professional review of red-flag rules | P0 before real-patient production use | SAFE-01 | Documented review and approval |

### 4.5 Backend and API Integration

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| API-01 | Implement and verify `GET /api/health` | P0 | FastAPI setup | Health endpoint |
| API-02 | Implement and verify `POST /api/upload` | P0 | OCR-01 to OCR-04 | Upload endpoint |
| API-03 | Implement and verify `POST /api/extract` | P0 | OCR-06 | OCR endpoint |
| API-04 | Implement and verify manual correction API | P0 | OCR-09 | Correction endpoint |
| API-05 | Implement and verify `POST /api/explain` | P0 | AI-01 to AI-07 | Explanation endpoint |
| API-06 | Implement and verify `POST /api/translate` | P1 | AI-08 | Translation endpoint |
| API-07 | Implement and verify `POST /api/questions` | P1 | AI-09 | Questions endpoint |
| API-08 | Implement and verify `POST /api/feedback` | P1 if approved | Feedback decision | Feedback endpoint |
| API-09 | Implement authentication and authorization endpoints | P0 if authentication remains in MVP | Authentication decision | Secure authentication API |
| API-10 | Standardize success and error responses | P0 | API contract review | Consistent API responses |
| API-11 | Implement appropriate HTTP status codes | P0 | API-10 | Correct error handling |
| API-12 | Validate request fields, file IDs and language values | P0 | API implementation | Input validation |
| API-13 | Add rate limiting and safe retry handling | P1 | Backend setup | Request protection |

Patient history (`GET /api/history`) remains excluded from the MVP unless the team approves persistent storage, authentication, access control and privacy requirements.

### 4.6 Administrator, Storage and Feedback

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| ADM-01 | Confirm administrator MVP requirements | P0 | PRD and team review | Approved admin requirements |
| ADM-02 | Implement basic application-health monitoring | P1 | Backend health endpoint | Monitoring interface |
| ADM-03 | Implement feedback and issue review | P1 | Feedback approval and API | Feedback management |
| ADM-04 | Define administrator access restrictions | P0 | Security requirements | Role and permission specification |
| DATA-01 | Decide whether Supabase PostgreSQL is required for MVP | P0 | Architecture and team decision | Storage decision |
| DATA-02 | If approved, design the minimum required database schema | P1 | DATA-01 | Database schema |
| DATA-03 | If approved, implement secure record access | P1 | DATA-02 and authentication | Authorized data access |
| DATA-04 | Keep report history outside MVP unless separately approved | P2 | Team decision | Documented exclusion |

### 4.7 Testing and Quality Assurance

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| TEST-01 | Prepare 10 anonymized medical-report fixtures | P0 | Test plan | `tests/fixtures/` |
| TEST-02 | Test upload formats and file-size validation | P0 | OCR and API implementation | Upload test results |
| TEST-03 | Test successful and failed OCR extraction | P0 | OCR implementation | OCR test results |
| TEST-04 | Test manual correction workflow | P0 | Correction API | Correction test results |
| TEST-05 | Test printed-range comparison and missing ranges | P0 | AI and extraction modules | Range safety test results |
| TEST-06 | Test deterministic red-flag execution | P0 | SAFE-01 and SAFE-02 | Red-flag test results |
| TEST-07 | Test AI service failures and safe fallbacks | P0 | AI-11 | Failure-handling test results |
| TEST-08 | Test unsafe AI output rejection | P0 | AI-10 | Safety validation test results |
| TEST-09 | Test translation preserves values and units | P1 | AI-08 | Translation test results |
| TEST-10 | Test doctor-question generation | P1 | AI-09 | Questions test results |
| TEST-11 | Test privacy, logging and temporary-file deletion | P0 | Security implementation | Privacy test results |
| TEST-12 | Test authentication and patient data isolation if applicable | P0 if authentication is approved | Authentication implementation | Security test results |
| TEST-13 | Test administrator permissions | P1 | Admin implementation | Permission test results |
| TEST-14 | Execute API contract and integration tests | P0 | API implementation | API test report |
| TEST-15 | Execute end-to-end user journey tests | P1 | Frontend/backend integration | E2E test report |
| TEST-16 | Verify linting, type checks and critical issue resolution | P0 | Development tasks | Quality checklist |

Proposed tools from the test plan: Pytest, Vitest, MSW, Bruno or Hoppscotch, Playwright and manual browser testing.

### 4.8 Deployment and Release Preparation

| ID | Task | Priority | Dependency | Deliverable |
|---|---|---|---|---|
| REL-01 | Prepare frontend deployment configuration | P1 | Frontend integration | Deployment-ready frontend |
| REL-02 | Prepare backend deployment configuration | P1 | Backend integration | Deployment-ready backend |
| REL-03 | Configure production environment variables | P0 | Deployment setup | Secure configuration |
| REL-04 | Configure GitHub Actions where approved | P1 | Repository and test setup | CI workflow |
| REL-05 | Verify deployed frontend/backend communication | P0 | REL-01 and REL-02 | Integration verification |
| REL-06 | Verify HTTPS and privacy requirements | P0 | Security tasks | Deployment security checklist |
| REL-07 | Prepare release notes and known limitations | P1 | Team review | Release documentation |
| REL-08 | Obtain team approval before release | P0 | Testing and safety review | Release approval |

## 5. Suggested Responsibility Allocation

Individual developer assignments must be confirmed by the team. The table below identifies responsibility areas, not confirmed individual commitments.

| Person / Role | Suggested responsibility |
|---|---|
| Person 1 — Product Strategy & Design Lead | Stage 1, Stage 4, Stage 7, Stage 10; product requirements, UI/UX coordination and release preparation |
| Person 2 — Research / Technical Architecture Lead | Research, architecture, technical design and assigned implementation work |
| Person 3 — Quality & Engineering Lead | Test planning, quality assurance, verification and safety testing |
| Systems & DevOps Lead | API contracts, infrastructure, deployment and backend integration coordination |
| Frontend implementation owner | To be confirmed |
| OCR/AI implementation owner | To be confirmed |
| Safety-rule implementation owner | To be confirmed |
| Administrator implementation owner | To be confirmed |

Person 1's product-design responsibility does not automatically mean Person 1 owns every frontend coding task.

## 6. Dependencies and Implementation Sequence

The proposed implementation sequence is:

1. Confirm MVP decisions and freeze requirements.
2. Finalize screen flows, API contracts and technical responsibilities.
3. Configure frontend and backend project structure.
4. Implement upload validation and temporary document handling.
5. Implement OCR and manual verification.
6. Implement deterministic red-flag checks.
7. Integrate AI explanations and response validation.
8. Integrate translation and doctor-question generation.
9. Implement authentication, administrator features and feedback according to approved MVP decisions.
10. Complete frontend/backend integration.
11. Execute safety, privacy, functional and end-to-end tests.
12. Fix critical issues and prepare release documentation.
13. Obtain team approval before release.

**Critical dependency:** AI explanation generation must not bypass OCR verification or deterministic safety checks.

## 7. Pending Team Decisions

The following issues must be resolved before the affected implementation tasks are finalized.

| No. | Decision required | Conflicting information / current position |
|---|---|---|
| 1 | Maximum upload size | Stage 4 design: 10 MB; Stage 6 test plan: 25 MB |
| 2 | Supported languages | Earlier scope/design includes English, Hindi and Kannada; Stage 6 test plan specifies English and Kannada |
| 3 | Reading levels | Simple, Standard and Detailed appear in earlier design context; confirmation needed |
| 4 | Authentication | PRD lists registration/login in MVP; test plan says pending decision |
| 5 | Administrator dashboard | PRD lists basic admin monitoring and feedback management in MVP; confirm minimum features |
| 6 | Feedback | PRD includes feedback; test plan treats the endpoint as conditional |
| 7 | Save/share | Scope and design include it; test plan excludes it pending approval |
| 8 | Doctor questions | PRD specifies approximately 3–4; confirm the final output count |
| 9 | Database | Architecture proposes optional Supabase PostgreSQL; confirm whether required for MVP |
| 10 | Data retention | Temporary document retention period is not finalized |
| 11 | Patient history | API contract makes it optional; test plan excludes it from MVP |
| 12 | Medical review | Qualified professional review of red-flag rules is required before production use |
| 13 | Frontend implementation ownership | Person responsible for frontend coding must be explicitly assigned |
| 14 | Deployment ownership | Confirm who handles Cloudflare Pages, Render and GitHub Actions |

## 8. Definition of Done

A task can be marked complete only when:

- The agreed requirements have been implemented.
- Its deliverable is available in the project repository.
- Dependencies and integration points have been verified.
- Relevant acceptance criteria pass.
- Required automated and manual tests pass.
- Medical safety requirements are preserved.
- No known critical privacy or security issue remains.
- Documentation is updated where necessary.
- The responsible team member has reviewed the work.

A planned task must not be marked completed merely because its code or documentation has been drafted.

## 9. Stage 7 Completion Checklist

- [ ] All MVP requirements have been converted into development tasks.
- [ ] Each task has a priority.
- [ ] Dependencies are identified.
- [ ] Deliverables are defined.
- [ ] Responsibility areas are identified.
- [ ] Individual task owners are confirmed by the team.
- [ ] Conflicting requirements are recorded.
- [ ] Team decisions are documented.
- [ ] Acceptance criteria and Definition of Done are agreed.
- [ ] Stage 7 document is reviewed and approved.
- [ ] Final document is committed and pushed to GitHub.

## 10. Out-of-Scope / Post-MVP Work

Unless the team explicitly changes the scope, the following remain later enhancements:

- WhatsApp chatbot integration.
- Nearby laboratories and clinics map.
- Medicine reminders.
- Voice readout.
- Advanced patient report history.
- HIS/EHR integration.
- Advanced doctor dashboards.
- Human medical expert verification as an in-app service.
- Handwritten prescription support.

## 11. Document Status

This task breakdown is a planning draft based on the current project requirements, architecture, API contracts, safety rules and test plan.

All implementation statuses must be verified against the actual repository and running application. Conflicting MVP decisions require team confirmation before final task assignment.

**Project:** ReportSaathi  
**Stage:** 7 — Task Breakdown  
**Owner:** Person 1 — Product Strategy & Design Lead  
**Status:** Draft — Pending Team Review and Confirmation