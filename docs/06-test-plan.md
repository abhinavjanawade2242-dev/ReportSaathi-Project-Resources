# ReportSaathi – Test Plan

**Document:** Stage 6 – Test Plan  
**Owner:** Person 3 – Quality & Engineering Lead  
**Status:** Proposed – Pending Team Confirmation and Backend Integration

## 1. Objective

Define the testing strategy for ReportSaathi to verify functionality, API contracts, input validation, medical safety, privacy and reliability.

Testing must ensure that the application explains medical information responsibly without diagnosing patients, recommending medication changes or inventing laboratory reference ranges.

**Important:** The requirements and decisions in this document are proposed testing expectations. They do not confirm that the backend currently implements them.

## 2. Testing Scope

### 2.1 Proposed MVP features

- Language selection: English and Kannada.
- Medical document upload: PDF, JPG, JPEG and PNG.
- Maximum upload size: 25 MB.
- OCR text extraction.
- Manual verification and correction of unclear extracted text.
- Plain-language medical report explanations.
- Comparison with reference ranges printed on the report.
- Deterministic red-flag checks before AI explanation generation.
- Medical explanation disclaimer.
- Translation into supported languages.
- Doctor-question generation.
- Safe handling of OCR and AI failures.

### 2.2 Excluded or conditional features

| Feature | Testing status |
|---|---|
| Save/share | Excluded until team approval |
| Patient report history | Excluded from MVP |
| Authentication | Pending team decision |
| Patient data isolation | Security requirement to discuss and verify if applicable |
| Feedback endpoint | Conditional MVP feature |
| WhatsApp integration | Post-MVP |
| Nearby labs/clinics map | Post-MVP |
| Medicine reminders | Post-MVP |
| Voice readout | Post-MVP |

## 3. Proposed API Contract Coverage

| Endpoint | Method | Testing priority |
|---|---|---|
| `/api/health` | GET | MVP |
| `/api/upload` | POST | MVP |
| `/api/extract` | POST | MVP |
| `/api/explain` | POST | MVP |
| `/api/translate` | POST | MVP |
| `/api/questions` | POST | MVP |
| `/api/feedback` | POST | Conditional |
| `/api/history` | GET | Excluded from MVP |

The API contract is proposed and must be checked against the actual FastAPI implementation.

## 4. Proposed Validation and Error Handling

### 4.1 Upload validation

| Scenario | Expected HTTP status |
|---|---:|
| Valid PDF, JPG, JPEG or PNG | 200 |
| Empty upload | 400 |
| Unsupported file format | 415 |
| File larger than 25 MB | 413 |

### 4.2 Other API validation

| Scenario | Expected HTTP status |
|---|---:|
| Invalid document ID | 404 |
| Missing or malformed required fields | 422 |
| Unsupported language | 422 |
| OCR failure | 422 |
| AI service failure or timeout | 503 |

The exact error codes and messages must be verified against the final implementation.

### 4.3 Proposed error response structure

All error responses should follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_DOCUMENT_ID",
    "message": "The requested document was not found."
  }
}
```

The frontend must display understandable messages rather than raw server errors or internal stack traces.

## 5. Acceptance Test Cases

### TC-01: Language selection

**Given:** The user opens the application.  
**When:** The user selects English or Kannada.  
**Then:** The selected language should be accepted and used for the requested explanation.

### TC-02: Unsupported language

**Given:** The API receives an unsupported language.  
**When:** The request is submitted.  
**Then:** The API should return HTTP 422 and clearly identify the supported languages: English and Kannada.

### TC-03: Valid document upload

**Given:** The user selects a supported PDF, JPG, JPEG or PNG file within the 25 MB limit.  
**When:** The user uploads the document.  
**Then:** The API should return HTTP 200 with a temporary document ID, filename and upload status.

### TC-04: Empty document upload

**Given:** The user submits an empty file.  
**When:** The upload request is processed.  
**Then:** The API should return HTTP 400 with a safe validation message.

### TC-05: Unsupported document format

**Given:** The user selects an unsupported file format.  
**When:** The file is uploaded.  
**Then:** The API should return HTTP 415.

### TC-06: Oversized document upload

**Given:** The user selects a document larger than 25 MB.  
**When:** The file is uploaded.  
**Then:** The API should return HTTP 413 and reject the file.

### TC-07: Successful OCR extraction

**Given:** A valid document has been uploaded.  
**When:** The user requests text extraction using its document ID.  
**Then:** The API should return extracted text and an extraction status.

### TC-08: Unclear OCR result

**Given:** An uploaded report contains blurry or unclear text.  
**When:** OCR processing is performed.  
**Then:** The application should request manual verification or correction and must not confidently explain uncertain values.

### TC-09: Invalid document ID

**Given:** An invalid or nonexistent document ID is submitted.  
**When:** Extraction or explanation is requested.  
**Then:** The API should return HTTP 404 with a safe error response.

### TC-10: Manual correction

**Given:** OCR extraction returns incorrect or uncertain text.  
**When:** The user corrects the extracted information.  
**Then:** The application should use the corrected text for subsequent processing.

### TC-11: Reference range comparison

**Given:** A report contains a medical value and its printed reference range.  
**When:** The application processes the report.  
**Then:** The displayed status should be based on the printed reference range and original value.

### TC-12: Missing reference range

**Given:** A report contains a medical value without a printed reference range.  
**When:** The application explains the report.  
**Then:** It must not invent a reference range or confidently classify the value using an assumed range.

### TC-13: Deterministic red-flag checks

**Given:** A report contains information matching a predefined red-flag rule.  
**When:** The backend processes the report.  
**Then:** Deterministic safety checks must execute before AI explanation generation, and the relevant warning must be preserved.

### TC-14: AI service failure

**Given:** The AI service is unavailable or times out.  
**When:** An explanation is requested.  
**Then:** The API should return HTTP 503 with a safe fallback message and must not invent a medical explanation.

### TC-15: Red-flag warning during AI failure

**Given:** A report triggers a predefined red-flag rule and the AI service fails.  
**When:** The application displays the result.  
**Then:** The red-flag warning must remain visible even when AI explanation generation fails.

### TC-16: Unsafe AI output

**Given:** The AI produces a diagnosis, medication change recommendation or other prohibited medical advice.  
**When:** The backend safety validation checks the output.  
**Then:** The unsafe output must be rejected and replaced with a safe fallback response.

### TC-17: Translation accuracy

**Given:** An explanation contains medical values, units and prescription instructions.  
**When:** The explanation is translated into Kannada.  
**Then:** The translation must preserve the original values, units and instructions.

### TC-18: Doctor-question generation

**Given:** A valid medical explanation is available.  
**When:** The user requests questions for a doctor.  
**Then:** The application should generate relevant questions without recommending self-treatment or medication changes.

### TC-19: Feedback validation (conditional)

**Given:** The feedback endpoint is included in the MVP.  
**When:** A user submits a rating between 1 and 5.  
**Then:** The API should accept the valid rating.

Invalid ratings should be rejected using the agreed validation response.

This test is excluded if feedback is moved to post-MVP.

### TC-20: Sensitive information in logs

**Given:** A document is uploaded and processed.  
**When:** Backend operations and error handling are recorded.  
**Then:** Medical report contents and personal health information must not appear in application logs or analytics.

### TC-21: Temporary document deletion

**Given:** A document has completed processing or reached the agreed session-retention limit.  
**When:** The retention policy is executed.  
**Then:** Temporary uploaded documents and extracted text should be deleted according to the finalized policy.

The exact retention period is pending team confirmation.

## 6. Medical Safety Test Requirements

Medical safety is a critical part of the testing process.

The following conditions must be verified:

1. Deterministic red-flag checks execute before AI explanation generation.
2. Red-flag warnings remain available even if the AI service fails.
3. The application never provides a medical diagnosis.
4. The application never recommends starting, stopping or changing prescribed medication.
5. The application never invents laboratory reference ranges.
6. Original laboratory values and units are preserved.
7. Unclear OCR results require manual verification.
8. Unsafe AI output is rejected.
9. Safe fallback messages are displayed when AI processing fails.
10. Medical disclaimers accompany explanations.

**Critical rule:** Safety tests must never be weakened or removed just to make the test suite pass.

## 7. Privacy and Security Testing

Verify the following requirements:

- Uploaded files are validated before processing.
- API keys and secrets are not exposed in frontend code.
- HTTPS is used in deployed environments.
- Medical report contents are excluded from application logs and analytics.
- Temporary files and extracted text follow the approved deletion policy.
- Authentication and patient data isolation remain requirements pending the team's MVP decision.
- If authentication and persistent patient records are introduced, unauthorized access and cross-user access must be tested.
- Invalid document IDs must not expose another user's medical information.
- Filenames and extracted text must be treated as untrusted input.

## 8. Test Fixtures

Prepare 10 anonymized sample medical-report fixtures under `tests/fixtures/`.

| Fixture | Purpose |
|---|---|
| `01-normal-report` | Normal-looking values with printed ranges |
| `02-high-values` | Values above printed ranges |
| `03-low-values` | Values below printed ranges |
| `04-missing-ranges` | Values without reference ranges |
| `05-blurry-report` | OCR uncertainty |
| `06-multiple-values` | Multiple medical values |
| `07-scanned-pdf` | PDF OCR processing |
| `08-ocr-challenges` | Difficult text extraction |
| `09-multilingual-report` | Language and translation testing |
| `10-red-flag-case` | Deterministic safety-rule testing |

All fixtures must be anonymized and must not contain identifiable patient information.

## 9. Testing Types and Tools

| Testing type | Purpose | Proposed tools |
|---|---|---|
| Unit testing | Test individual functions and validation rules | Pytest, Vitest |
| Integration testing | Test communication between frontend and backend | Pytest, MSW |
| API contract testing | Verify request and response structures | Bruno / Hoppscotch, automated API tests |
| End-to-end testing | Test complete user journeys | Playwright |
| Security testing | Verify privacy and input validation | Pytest and manual checks |
| Medical safety testing | Verify deterministic rules and safe AI output handling | Pytest |
| Manual testing | Verify usability and error messages | Browser testing |

## 10. Test Execution and Completion Criteria

A feature or task should be considered tested only when:

- Its acceptance criteria have been verified.
- Relevant unit tests pass.
- Relevant integration tests pass.
- API contract tests pass.
- Medical safety tests pass where applicable.
- Lint and type checks pass.
- No known critical privacy or security issue remains.
- Error handling and safe fallback behavior have been verified.

Tests should be written before implementation wherever practical.

## 11. Implementation Status

| Area | Status |
|---|---|
| Proposed API endpoints | Received from Systems & DevOps Lead |
| Upload formats and 25 MB limit | Proposed |
| English and Kannada | Proposed |
| HTTP error statuses | Proposed |
| Standard error response | Proposed |
| Deterministic red-flag execution | Required; implementation pending verification |
| Privacy and deletion policy | Proposed; retention period pending |
| Authentication | Pending team decision |
| Feedback endpoint | Conditional MVP |
| Save/share | Excluded pending approval |
| Backend integration testing | Pending implementation |
| Test fixtures | To be prepared |
| Automated test execution | Pending implementation |

## 12. Pending Team Confirmations

The following decisions must be finalized before implementation and final test execution:

1. Confirm the proposed upload formats and 25 MB limit.
2. Confirm English and Kannada as the initial supported languages.
3. Confirm whether feedback is included in the MVP.
4. Confirm the exact temporary document retention period.
5. Decide whether authentication is required for the MVP.
6. Confirm patient data isolation requirements.
7. Verify all proposed API schemas and error responses against the running backend.
8. Confirm that save/share remains outside the MVP.

---

**Project:** ReportSaathi  
**Stage:** 6 – Test Plan  
**Owner:** Person 3 – Quality & Engineering Lead  
**Document status:** Proposed – Pending Team Confirmation and Backend Integration
