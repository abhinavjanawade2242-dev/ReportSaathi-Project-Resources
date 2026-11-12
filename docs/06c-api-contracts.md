# ReportSaathi – API Contracts

## 1. Purpose

This document defines the communication contract between the ReportSaathi frontend and backend.

It specifies API endpoints, HTTP methods, request formats, response formats, validation requirements and error handling.

These contracts are proposed for the MVP and must be updated if implementation decisions change.

## 2. API Overview

- Backend framework: FastAPI
- Data validation: Pydantic
- API format: REST
- Request format: JSON and multipart/form-data
- Response format: JSON
- Base URL (local): `http://127.0.0.1:8000`
- API prefix: `/api`

Interactive API documentation will be available at `/docs` when the FastAPI application is running.

## 3. Common Response Structure

Successful responses should use a consistent structure where practical.

Example:

```json
{
  "success": true,
  "message": "Request processed successfully",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "Invalid request",
  "error_code": "VALIDATION_ERROR"
}
```

HTTP status codes must accurately represent the result.

## 4. API Endpoints

### 4.1 Health Check

**Endpoint:** `/api/health`

**Method:** GET

**Purpose:** Check whether the backend service is running.

Request: No body required.

Successful response – 200:

```json
{
  "status": "healthy",
  "service": "ReportSaathi API"
}
```

### 4.2 Upload Medical Document

**Endpoint:** `/api/upload`

**Method:** POST

**Content-Type:** `multipart/form-data`

**Purpose:** Accept a patient's medical document for processing.

Request fields:

| Field | Type | Required |
|---|---|---|
| file | File | Yes |

Supported file types and size limits must be configured by the backend.

Successful response – 200:

```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "document_id": "temporary-document-id",
    "filename": "report.pdf",
    "status": "uploaded"
  }
}
```

The document ID is a temporary processing reference, not a permanent patient record.

### 4.3 Extract Text Using OCR

**Endpoint:** `/api/extract`

**Method:** POST

**Purpose:** Extract text from an uploaded medical document using OCR.

Request:

```json
{
  "document_id": "temporary-document-id"
}
```

Successful response – 200:

```json
{
  "success": true,
  "data": {
    "extracted_text": "Hemoglobin: 13.5 g/dL",
    "extraction_status": "completed",
    "requires_verification": false
  }
}
```

If the document is unclear, the response must identify that manual verification is required.

### 4.4 Explain Medical Report

**Endpoint:** `/api/explain`

**Method:** POST

**Purpose:** Generate a simple-language explanation of extracted medical information.

Request:

```json
{
  "document_id": "temporary-document-id",
  "extracted_text": "Hemoglobin: 13.5 g/dL",
  "language": "English"
}
```

Successful response – 200:

```json
{
  "success": true,
  "data": {
    "explanation": "This section explains the information in simple language.",
    "disclaimer": "This explanation is educational and is not a medical diagnosis.",
    "requires_medical_review": false
  }
}
```

The backend must not generate diagnoses, prescribe treatment or invent laboratory reference ranges.

### 4.5 Translate Explanation

**Endpoint:** `/api/translate`

**Method:** POST

**Purpose:** Translate an existing explanation into a supported language.

Request:

```json
{
  "text": "Your report contains the following information.",
  "target_language": "Kannada"
}
```

Successful response – 200:

```json
{
  "success": true,
  "data": {
    "translated_text": "Translated explanation",
    "language": "Kannada"
  }
}
```

The translation must preserve medical values, units and prescription instructions.

### 4.6 Generate Questions for Doctor

**Endpoint:** `/api/questions`

**Method:** POST

**Purpose:** Generate useful questions that a patient can discuss with a healthcare professional.

Request:

```json
{
  "explanation": "The report contains some values that require clarification."
}
```

Successful response – 200:

```json
{
  "success": true,
  "data": {
    "questions": [
      "Could you explain this result?",
      "Does this result require any follow-up?",
      "Should I discuss this result during my next appointment?"
    ]
  }
}
```

Questions must not recommend self-treatment or medication changes.

### 4.7 Retrieve History (Optional)

**Endpoint:** `/api/history`

**Method:** GET

**Purpose:** Retrieve previous report-processing records for an authenticated patient, if persistent storage and authentication are implemented.

This endpoint is optional and must not be considered available in the MVP until storage, access control and privacy requirements are implemented.

### 4.8 Submit Feedback

**Endpoint:** `/api/feedback`

**Method:** POST

**Purpose:** Collect feedback about the application's usefulness.

Request:

```json
{
  "rating": 4,
  "feedback": "The explanation was easy to understand."
}
```

Successful response – 200:

```json
{
  "success": true,
  "message": "Feedback submitted successfully"
}
```

Feedback collection must not include medical report contents or unnecessary personal health information.

## 5. HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Invalid request |
| 401 | Authentication required |
| 403 | Access forbidden |
| 404 | Resource not found |
| 413 | Uploaded file too large |
| 415 | Unsupported file format |
| 422 | Request validation failed |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | External service unavailable |

## 6. Validation Requirements

- Reject unsupported file formats.
- Enforce configured upload size limits.
- Validate required request fields.
- Validate document IDs before processing.
- Validate supported language selections.
- Validate feedback ratings.
- Reject empty or malformed requests.
- Never trust filenames or extracted document text as safe input.

## 7. Medical Safety Requirements

- Never provide a medical diagnosis.
- Never recommend changing prescribed medication.
- Never invent laboratory reference ranges.
- Preserve original laboratory values and units.
- Flag unclear OCR results for manual verification.
- Apply predefined emergency red-flag checks before waiting for an AI explanation.
- Provide safe fallback messages when AI output fails validation.
- Display the medical disclaimer with explanations.

## 8. Privacy and Security Requirements

- Use HTTPS in deployed environments.
- Keep API keys and secrets in backend environment variables.
- Validate uploaded files before processing.
- Avoid exposing medical information in application logs.
- Restrict patient records to authorized users if persistent storage is introduced.
- Do not send report contents to analytics services.
- Delete temporary uploaded documents and extracted data according to the application's retention policy.

## 9. Frontend and Backend Integration

The frontend should:

1. Upload a document using `/api/upload`.
2. Receive the temporary document ID.
3. Request OCR extraction using `/api/extract`.
4. Display extracted text for verification when required.
5. Request an explanation using `/api/explain`.
6. Request translation using `/api/translate` when needed.
7. Request doctor questions using `/api/questions`.
8. Display errors and safe fallback messages appropriately.

The backend is responsible for validation, OCR, AI processing, safety checks and structured responses.

## 10. Error Handling

The frontend must:

- Display understandable error messages.
- Show loading indicators during processing.
- Allow users to retry failed requests where safe.
- Avoid displaying raw server errors or internal stack traces.
- Preserve user-entered information when a request fails, where practical.

The backend must return consistent error responses and avoid exposing sensitive information.

## 11. Testing Requirements

Every implemented endpoint must be tested for:

- Successful requests.
- Missing required fields.
- Invalid input.
- Unsupported file formats.
- Oversized uploads.
- OCR failures.
- AI service failures.
- Invalid document IDs.
- Medical safety violations.
- Privacy and access-control failures where applicable.

## 12. Implementation Status

This document defines the proposed MVP API contract. Endpoint availability, authentication, storage, request schemas and response formats must be verified against the actual backend implementation.

Optional functionality must not be presented as implemented until it has been developed and tested.

---

**Project:** ReportSaathi  
**Document:** API Contracts  
**Owner:** Systems & DevOps Lead  
**Status:** Proposed – Pending Backend Integration