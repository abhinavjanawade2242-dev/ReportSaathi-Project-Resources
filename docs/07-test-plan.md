# ReportSaathi — Test Plan

**Stage:** 6 — Test Plan  
**Owner:** Person 3 — Quality & Engineering Lead  
**Status:** Draft

## 1. Objective

The objective of this test plan is to verify that ReportSaathi works correctly, reliably, and safely.

Testing will cover report uploads, OCR extraction, value validation, explanations, medical safety rules, API integration, and user experience.

## 2. Testing Scope

### Features to be tested

1. Language selection.
2. Photo and PDF upload.
3. OCR text extraction.
4. Manual correction of extracted values.
5. Medical value explanation.
6. Reference range comparison.
7. Deterministic red-flag detection.
8. Medicine information explanation.
9. Doctor question generation.
10. Save and share functionality.

### Features excluded from MVP testing

- WhatsApp chatbot.
- Nearby clinics and laboratories map.
- Medicine reminders.
- Report history and trends.
- Voice readout.

## 3. Testing Types

| Testing Type | Purpose |
|---|---|
| Unit Testing | Test individual functions and components. |
| Integration Testing | Verify that different modules work together. |
| Contract Testing | Verify API request and response formats. |
| End-to-End Testing | Test the complete user journey. |
| Security Testing | Check file validation, authentication and user data isolation. |
| Safety Testing | Verify medical safety rules and prevent unsafe outputs. |
| Manual Testing | Check usability and language explanations. |

## 4. Testing Tools

- Pytest — Python backend testing.
- Vitest — frontend unit testing.
- Playwright — end-to-end testing.
- MSW — frontend API mocking.
- Bruno or Hoppscotch — API testing.

## 5. Acceptance Criteria

### TC-01: Language Selection

**Given:** A user opens ReportSaathi.

**When:** The user selects a supported language.

**Then:** The application should display explanations in the selected language.

### TC-02: PDF Upload

**Given:** A user has a valid PDF medical report.

**When:** The user uploads the PDF.

**Then:** The application should accept the file and process it.

### TC-03: File Size Validation

**Given:** A user selects a file larger than the permitted 25 MB limit.

**When:** The user uploads the file.

**Then:** The application should reject it and display an appropriate error.

### TC-04: OCR Extraction

**Given:** A valid medical report is uploaded.

**When:** OCR processing is performed.

**Then:** The application should extract the available text and medical values.

### TC-05: Manual Correction

**Given:** OCR extracts an incorrect medical value.

**When:** The user corrects the extracted value.

**Then:** The corrected value should be used in subsequent processing.

### TC-06: Reference Range Comparison

**Given:** A report contains a medical value and its printed reference range.

**When:** The application evaluates the value.

**Then:** The displayed status should be based on that printed reference range.

### TC-07: Missing Reference Range

**Given:** A medical report does not contain a reference range for a value.

**When:** The application processes that value.

**Then:** The application must not invent a reference range or present an unsupported status.

### TC-08: Red-Flag Detection

**Given:** A report contains a value matching a predefined safety rule.

**When:** The backend processes the report.

**Then:** Deterministic backend rules should identify the applicable warning.

### TC-09: AI Service Failure

**Given:** A report triggers a predefined red-flag condition.

**When:** The AI service becomes unavailable.

**Then:** The red-flag alert must remain visible.

### TC-10: Unsafe Medical Advice

**Given:** A user requests a diagnosis or medication dose change.

**When:** The AI generates a response.

**Then:** The application must not provide a diagnosis or recommend medication changes.

### TC-11: Doctor Questions

**Given:** A user receives a report explanation.

**When:** The application generates doctor questions.

**Then:** It should provide relevant questions for discussion with a qualified doctor.

### TC-12: User Data Isolation

**Given:** Two different authenticated users use the application.

**When:** One user attempts to access another user's private report.

**Then:** The application must prevent unauthorized access.

## 6. Test Fixtures

The following test samples will be maintained in `tests/fixtures/`:

1. Normal medical report.
2. Report containing high values.
3. Report containing low values.
4. Report with missing reference ranges.
5. Report with unclear or blurry text.
6. Report with multiple medical values.
7. Scanned PDF report.
8. Report containing OCR extraction challenges.
9. Multilingual report.
10. Report containing predefined red-flag test cases.

All fixtures must be synthetic or properly anonymized. No real patient-identifying information should be committed.

## 7. Medical Safety Testing

- Verify that the backend performs deterministic red-flag checks.
- Verify that AI cannot override deterministic safety results.
- Verify that the application does not diagnose diseases.
- Verify that medication dosage changes are not recommended.
- Verify that missing reference ranges are not fabricated.
- Verify that medical disclaimers are displayed.
- Verify that safety alerts remain available when AI fails.

## 8. Test Completion Criteria

A feature is considered ready for acceptance when:

- Relevant tests pass.
- No critical safety test fails.
- API contracts are verified.
- Linting and type checks pass.
- Integration tests pass.
- Relevant end-to-end tests pass.
- Test results are documented.

## 9. Test Execution Status

| Testing Area | Status |
|---|---|
| Unit Testing | Not Started |
| Integration Testing | Not Started |
| Contract Testing | Not Started |
| End-to-End Testing | Not Started |
| Security Testing | Not Started |
| Safety Testing | Not Started |
| Manual Testing | Not Started |

---

**Document maintained by:** Person 3 — Quality & Engineering Lead
