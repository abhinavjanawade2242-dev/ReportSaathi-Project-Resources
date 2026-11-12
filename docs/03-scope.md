# ReportSaathi — Project Scope

**Stage:** 3 — Scope Definition  
**Owner:** Person 3 — Quality & Engineering Lead  
**Status:** Draft

## 1. Project Objective

ReportSaathi helps users understand medical laboratory reports and prescriptions through simple, understandable explanations in their preferred language.

The application provides educational information and does not replace professional medical advice.

## 2. Core User Journey

1. Choose preferred language.
2. Upload a medical report as a photo or PDF.
3. Extract report information using OCR.
4. Allow the user to review and correct extracted values.
5. Explain medical terms and report values in simple language.
6. Display value status using only reference ranges printed on the report.
7. Show relevant deterministic red-flag alerts.
8. Generate questions that users can ask their doctor.
9. Allow the user to save or share the explanation.

## 3. Feature Prioritization

### MVP — Must Have

- Photo and PDF report upload.
- OCR-based text extraction.
- Manual correction of extracted information.
- Explanation of medical terms in simple language.
- Value comparison using reference ranges printed on the report.
- Clear handling when reference ranges are unavailable.
- Deterministic red-flag alerts.
- Medicine information explanations without dosage recommendations.
- Suggested questions for doctor consultations.
- Three language options.
- Three explanation reading levels.
- Medical safety disclaimer.

### Later — Future Enhancements

- WhatsApp chatbot integration.
- Nearby laboratories and clinics map.
- Medicine reminders.
- Medical report history and trends.
- Voice-based explanation.

### Never — Excluded Features

- Medical diagnosis.
- Starting, stopping, or changing medication doses.
- Recommending medication changes.
- Inventing missing reference ranges.
- Online medical consultations.

## 4. Medical Safety Requirements

1. Red-flag checks must be implemented using deterministic backend Python logic.
2. Red-flag checks must execute before the LLM generates explanations.
3. AI must never diagnose medical conditions.
4. AI must never recommend starting, stopping, or changing medication doses.
5. Value status must be based only on reference ranges printed on the uploaded report.
6. Missing reference ranges must never be invented.
7. Red-flag alerts must remain visible even if the AI service fails.
8. Every explanation must include an appropriate medical disclaimer.

## 5. Scope Boundaries

This stage defines what the MVP will include, what can be developed later, and what must never be included.

Detailed technical architecture, infrastructure configuration, and production deployment are outside this stage.

## 6. Completion Criteria

- Core user journey documented.
- MVP features identified.
- Later enhancements identified.
- Excluded features documented.
- Medical safety requirements documented.
- Scope reviewed against the master ReportSaathi workflow.

---

**Document maintained by:** Person 3 — Quality & Engineering Lead
