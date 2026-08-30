# Fold in the existing mailing list

Sheet: https://docs.google.com/spreadsheets/d/1hCY5KujGIMsWPSRBL-_RxAoOTyc7uTRk4syM0-uMZcI

The addresses from that sheet live in `lib/existing-mailing-list.js`. They are merged into `/site/admin.html` CSV so the studio can export them even before Stripe import.

This Cloud Agent environment has no `STRIPE_SECRET_KEY`, so the Stripe copy was not written here. Do not email these people.

When a live Stripe secret is available:

```
node scripts/import-mailing-list.js --check
STRIPE_SECRET_KEY=sk_live_... node scripts/import-mailing-list.js --dry-run
STRIPE_SECRET_KEY=sk_live_... node scripts/import-mailing-list.js
```

The script creates or tags Stripe customers with `metadata.source = studio26_mailing_list` and skips duplicates. It does not send mail.

New public signups from `/site/list.html` still go through `/api/mailing-list.js` and show up in the same admin CSV.
