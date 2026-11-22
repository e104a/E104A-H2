# Backend setup – E104A-H2

## 1. Create the new spreadsheet
Create a blank Google Spreadsheet. Add the tabs below, using exact names and exact row-1 headers from `docs/DATABASE_SCHEMA.md`.

Recommended initial tabs:
- MON_HOC
- CAU_HOI
- DAP_AN
- GIAI_THICH
- DE_THI
- CHI_TIET_BAI_THI
- NGUOI_DUNG
- CAU_HINH

## 2. Create Apps Script
From the new spreadsheet, choose Extensions → Apps Script. Replace the default code with `Code.gs` from this folder.

## 3. Configure the spreadsheet ID
Apps Script → Project Settings → Script Properties. Add:
- Property: `SPREADSHEET_ID`
- Value: spreadsheet ID from the new sheet URL.

## 4. Deployment
Do not deploy publicly until the spreadsheet headers are created and health/listing actions are tested. Use Deploy → New deployment → Web app. Select access settings according to intended audience and account policy.

## Current actions
- GET `?action=health`
- GET `?action=subjects`
- GET `?action=practiceQuestions&subjectId=...`
- POST JSON `{ action: "createExam", subjectId: "..." }`
- POST JSON `{ action: "submitExam", attemptId: "...", questionIds: [...], answers: [{ questionId: "...", optionLabel: "A" }] }`

**Important:** Apps Script Web Apps have cross-origin/browser restrictions and redirect behavior. Do not assume a GitHub Pages frontend can directly call the endpoint with ordinary fetch in every configuration. Validate the integration path before wiring the frontend.
