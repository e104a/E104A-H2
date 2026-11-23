# E104A-H2 – PWA deployment status

The repository root contains the active Vite app. PWA metadata, manifest, service worker, and GitHub Pages workflow have been added.

## Before enabling GitHub Pages
- Repository → Settings → Pages → Build and deployment → GitHub Actions.
- Verify the Actions workflow completes successfully.
- Open the deployed HTTPS URL.
- Browser install prompt depends on browser/platform requirements.

## Known current limitations
- The interface in src/main.jsx still uses an embedded sample bank.
- The backend Apps Script is a starter and has not been verified against a live spreadsheet.
- The current demo exam screen deliberately blocks starting when there are fewer than 30 questions.
- Do not use the demo to record official examination results.
