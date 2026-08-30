#!/usr/bin/env node
// Fold Kiki's existing sheet into Stripe customers with
// metadata.source = studio26_mailing_list.
// Does not email anyone. Dedupes by email.

const { existingMailingList, normalizeEmail } = require("../lib/existing-mailing-list");

const SOURCE = "studio26_mailing_list";

function arg(name) {
  return process.argv.includes(name);
}

async function findCustomer(stripe, email) {
  const matches = await stripe.customers.list({ email, limit: 100 });
  return matches.data.find((customer) => {
    const source = customer.metadata && customer.metadata.source;
    return normalizeEmail(customer.email) === email && (source === SOURCE || !source);
  }) || matches.data.find((customer) => normalizeEmail(customer.email) === email) || null;
}

async function main() {
  const rows = existingMailingList();
  if (arg("--check")) {
    const emails = rows.map((row) => row.email);
    const unique = new Set(emails);
    if (emails.length !== unique.size) {
      throw new Error("Existing mailing list has duplicate emails.");
    }
    console.log(`Ready to import ${rows.length} unique emails. No emails will be sent.`);
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.log(`
No STRIPE_SECRET_KEY in this environment.

The ${rows.length} existing addresses are saved in lib/existing-mailing-list.js
and already appear in /site/admin.html CSV (merged with live signups).

New list.html signups still go through /api/mailing-list.js:
- Stripe customer with metadata.source = studio26_mailing_list when the live secret is set
- studio inbox alert via Resend
- export from /site/admin.html

To write the existing sheet into Stripe later (no emails sent):

  STRIPE_SECRET_KEY=sk_live_... node scripts/import-mailing-list.js

Dry run:

  STRIPE_SECRET_KEY=sk_live_... node scripts/import-mailing-list.js --dry-run
`.trim());
    process.exit(0);
  }

  const Stripe = require("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const dryRun = arg("--dry-run");
  let created = 0;
  let skipped = 0;
  let tagged = 0;

  for (const row of rows) {
    const existing = await findCustomer(stripe, row.email);
    if (existing) {
      const source = existing.metadata && existing.metadata.source;
      if (source === SOURCE) {
        skipped += 1;
        console.log(`skip  ${row.email} (${existing.id})`);
        continue;
      }
      if (dryRun) {
        tagged += 1;
        console.log(`tag   ${row.email} (${existing.id})`);
        continue;
      }
      await stripe.customers.update(existing.id, {
        metadata: {
          ...(existing.metadata || {}),
          source: SOURCE,
          request_type: "mailing_list",
          imported_from: "kiki_sheet",
        },
      });
      tagged += 1;
      console.log(`tag   ${row.email} (${existing.id})`);
      continue;
    }

    if (dryRun) {
      created += 1;
      console.log(`add   ${row.email}`);
      continue;
    }

    const customer = await stripe.customers.create({
      name: row.name,
      email: row.email,
      description: "Studio 26 mailing list",
      metadata: {
        source: SOURCE,
        request_type: "mailing_list",
        imported_from: "kiki_sheet",
      },
    });
    created += 1;
    console.log(`add   ${row.email} (${customer.id})`);
  }

  console.log(`${dryRun ? "Dry run. " : ""}created=${created} tagged=${tagged} skipped=${skipped}. No emails sent.`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
