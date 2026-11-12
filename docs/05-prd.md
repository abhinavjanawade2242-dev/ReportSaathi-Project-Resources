
# ReportSaathi – Product Requirements Document (PRD)

**Project Name:** ReportSaathi  
**Document:** Product Requirements Document  
**Version:** 1.0  
**Status:** Draft

---

## 1. Product Overview

ReportSaathi is an AI-assisted healthcare application designed to help patients and caregivers understand medical reports, laboratory results, prescriptions, and discharge summaries in simple and understandable language.

The application uses Optical Character Recognition (OCR) to extract information from uploaded medical documents and Artificial Intelligence (AI) to generate easy-to-understand explanations.

The system aims to reduce confusion caused by complex medical terminology and help users become better informed before consulting healthcare professionals.

## 2. Problem Statement

Many patients find it difficult to understand their medical reports because they contain technical terminology, unfamiliar abbreviations, laboratory values, and medical instructions.

Existing healthcare applications may provide access to reports and appointments, but patients can still struggle to understand the information in their documents.

The major problems include:

- Difficulty understanding medical terminology.
- Confusion about laboratory results and reference ranges.
- Difficulty understanding prescription instructions.
- Language and accessibility barriers.
- Lack of guidance when preparing questions for doctors.
- Concerns about medical information privacy and reliability.

ReportSaathi aims to address these problems through simple explanations, multilingual support, and safety-focused AI assistance.

## 3. Product Goals

The primary goals of ReportSaathi are:

1. Help users understand medical documents in simple language.
2. Extract text and relevant information from uploaded documents using OCR.
3. Explain laboratory results using reference ranges available in the original report.
4. Clarify existing prescription instructions without modifying them.
5. Support explanations in multiple languages.
6. Generate useful questions that users can discuss with healthcare professionals.
7. Identify predefined medical warning signs and encourage appropriate professional attention.
8. Protect users' sensitive medical information.

---

## 4. Target Users

ReportSaathi is designed for the following user groups:

### 4.1 Patients
- People who receive medical reports and need help understanding them.
- Users who want simple explanations of laboratory results.
- People who need help understanding existing prescription instructions.

### 4.2 Family Members and Caregivers
- People who help family members understand medical documents.
- Caregivers who manage medical reports for elderly people.
- Users who need explanations in their preferred language.

### 4.3 Healthcare Professionals
- Doctors and clinic staff who may use the platform to understand common patient difficulties.
- Healthcare professionals who may review patient-prepared questions and feedback.

## 5. User Roles

The application will support the following roles:

### 5.1 Customer / Patient
- Register and log in to the application.
- Upload medical documents.
- View extracted text from uploaded documents.
- Receive simplified medical explanations.
- View laboratory values alongside the reference ranges printed in the report.
- Request explanations in supported languages.
- Generate questions to discuss with doctors.
- View previous explanations, subject to the application's privacy and retention policy.

### 5.2 Administrator
- Manage application-level settings.
- Monitor application health and system errors.
- Review user feedback and reported issues.
- Monitor AI and OCR service performance.
- Manage supported languages and application content.
- Review safety-related incidents and take appropriate action.

**Important:** Administrators must not access users' medical documents unless explicitly authorized for a legitimate support or safety purpose under the privacy policy.

---

## 6. Functional Requirements

Functional requirements describe the features that the application must provide.

### FR-01: User Authentication
The system should allow users to register, log in, and securely access their accounts.

### FR-02: Medical Document Upload
The system should allow users to upload supported medical documents in PDF and image formats.

### FR-03: OCR Text Extraction
The system should extract readable text from uploaded documents using OCR technology.

### FR-04: Medical Report Explanation
The system should convert complex medical terminology into simple, understandable language.

### FR-05: Laboratory Result Explanation
The system should explain laboratory values using only the reference ranges printed in the uploaded report.

### FR-06: Prescription Clarification
The system should explain existing prescription instructions without changing medication names, dosages, frequency, or duration.

### FR-07: Multilingual Support
The system should provide explanations in supported languages while preserving medical meaning.

### FR-08: Doctor Question Generation
The system should generate approximately 3–4 useful questions that users can discuss with their healthcare professionals.

### FR-09: Safety Warning Detection
The backend should check predefined medical warning conditions before sending relevant information to the AI service.

### FR-10: User Feedback
The system should allow users to report incorrect explanations, OCR problems, and other application issues.

### FR-11: Error Handling
The system should display understandable error messages when document uploads, OCR processing, or AI services fail.


---

## 7. Non-Functional Requirements

### NFR-01: Performance
- The application should process normal medical documents within a reasonable time.
- The interface should respond smoothly to user interactions.
- Long-running OCR and AI operations should display processing indicators.

### NFR-02: Security
- All communication between frontend and backend should use HTTPS in production.
- Sensitive API keys must be stored securely on the backend.
- User authentication and authorization must be implemented securely.
- Medical information must not be exposed through application logs.

### NFR-03: Privacy
- The application should collect only the information required to provide its services.
- Users should be informed about how their medical documents are processed.
- Medical documents should not be sent to analytics platforms.
- Document retention and deletion should follow the application's privacy policy.

### NFR-04: Reliability
- The application should handle OCR and AI service failures gracefully.
- Failed operations should provide clear error messages.
- The system should avoid presenting incomplete or incorrectly extracted information as verified results.

### NFR-05: Usability
- The interface should be simple and understandable for non-technical users.
- Important information should be displayed clearly.
- The application should support mobile and desktop screens.

### NFR-06: Scalability
- The backend should support future increases in users and document processing requests.
- The architecture should allow additional languages and document formats to be introduced.

### NFR-07: Maintainability
- The frontend and backend should have separate, organized code structures.
- APIs should follow consistent request and response formats.
- Dependencies and setup instructions should be documented.

## 8. Minimum Viable Product (MVP)

The first version of ReportSaathi will focus on the following essential features:

1. User registration and login.
2. Medical document upload.
3. OCR-based text extraction.
4. AI-assisted medical report explanation.
5. Laboratory result explanation using printed reference ranges.
6. Prescription instruction clarification.
7. Basic multilingual explanation.
8. Doctor question generation.
9. Backend medical safety checks.
10. Basic administrator monitoring and feedback management.

### 8.1 Features Outside the Initial MVP

The following features may be considered for future versions:

- Direct integration with hospital information systems.
- Electronic health record synchronization.
- Advanced doctor and clinic dashboards.
- Human medical expert verification.
- Advanced analytics and reporting.
- Support for handwritten prescriptions.

## 9. Success Metrics

The success of ReportSaathi will be evaluated using the following proposed targets:

| Metric | Target |
|---|---:|
| User comprehension improvement | Above 80% |
| Printed report OCR accuracy | Above 95% |
| Diagnostic attempts by AI | 0 |
| Prescription dosage modifications | 0 |
| User NPS | Above 50 |
| Doctors finding generated questions helpful | Above 70% |

These are project targets, not currently verified results. They must be evaluated through testing and user feedback.

## 10. Assumptions and Dependencies

### Assumptions
- Users can upload readable medical documents.
- Users have access to an internet connection.
- Uploaded documents contain sufficient information for explanation.
- Users understand that ReportSaathi is an educational assistance tool, not a replacement for doctors.

### Dependencies
- OCR technology for text extraction.
- AI API for generating simplified explanations.
- Backend framework for processing requests.
- Frontend framework for the user interface.
- Secure hosting and deployment services.
- Supported language translation capabilities.

## 11. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| Incorrect OCR extraction | Validate extracted text and allow users to review it |
| AI-generated misinformation | Use restricted prompts, validation and safety checks |
| Incorrect laboratory interpretation | Use only reference ranges printed in the original report |
| Medical safety issues | Apply deterministic backend warning checks before AI processing |
| Privacy violations | Use secure transmission, access controls and data minimization |
| AI service failure | Provide error handling and retry mechanisms |
| Language translation errors | Preserve medical terminology and validate translations |

## 12. Medical Safety Limitations

ReportSaathi is an educational healthcare assistance application.

The system must never:

- Diagnose diseases or medical conditions.
- Prescribe new medicines.
- Change medication dosages or schedules.
- Recommend stopping prescribed medicines.
- Invent laboratory reference ranges.
- Replace professional medical consultation.
- Provide false reassurance when urgent medical attention may be required.

All medical explanations must clearly communicate their limitations and encourage users to consult qualified healthcare professionals.

## 13. Future Enhancements

Potential future improvements include:

- Additional Indian language support.
- Integration with diagnostic laboratories.
- Improved OCR for complex document layouts.
- Secure sharing of explanations with healthcare professionals.
- Accessibility improvements for elderly and visually impaired users.
- Additional document formats and structured health data support.

## 14. Conclusion

ReportSaathi aims to make medical information easier to understand through OCR, AI-assisted explanations and multilingual support.

The initial MVP will prioritize usability, privacy, reliability and medical safety while avoiding diagnosis and treatment recommendations.

The product will evolve through technical testing, user feedback and healthcare professional input.
