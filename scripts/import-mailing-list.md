# Fold in the existing mailing list

Existing sheet (import later, do not block the public page):

https://docs.google.com/spreadsheets/d/1hCY5KujGIMsWPSRBL-_RxAoOTyc7uTRk4syM0-uMZcI/edit

1. Export the sheet as CSV with `name,email` columns.
2. New signups already land as Stripe customers with `metadata.source = studio26_mailing_list` and email Studiotwentysix.ca@gmail.com via Resend.
3. Export current signups from `/site/admin.html` (CSV button) or `GET /api/admin-bookings`.
4. One-shot import: POST each row to `/api/mailing-list` as `{ "name", "email" }` from a trusted machine with the live site URL.
