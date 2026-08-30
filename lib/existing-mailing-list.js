// Existing Studio Twenty Six mailing list from Kiki's sheet.
// https://docs.google.com/spreadsheets/d/1hCY5KujGIMsWPSRBL-_RxAoOTyc7uTRk4syM0-uMZcI
// Import these into Stripe with scripts/import-mailing-list.js. Do not email these people.

const EXISTING_MAILING_LIST = [
  "Michelllepcooer@gmail.com",
  "bpkinsf@gmail.com",
  "jessica.midden@gmail.com",
  "kimproctor@hotmail.com",
  "tedmaruyama@gmail.com",
  "hollychen6@gmail.com",
  "smithwickcarey@gmail.com",
  "jakehimmel@gmail.com",
  "cbbrosnahan@gmail.com",
  "laschnug@gmail.com",
  "atavern@gmail.com",
  "LauraMNewberry@gmail.com",
  "lymulcany@gmail.com",
  "JASONBLACK1026@gmail.com",
  "steph@davis-creative.com",
  "briskman@gmail.com",
  "kendallandkids@gmail.com",
  "lilymckeithan@gmail.com",
  "joycecarolwu@gmail.com",
  "karensp@berkeley.edu",
  "j_cavalli@hotmail.com",
  "reitanokiki@gmail.com",
  "rahabanoo@gmail.com",
  "shivani.saudharia@gmail.com",
  "AmemParee@gmail.com",
  "marichris213@gmail.com",
  "adrianjoel.vazquez@gmail.com",
  "kelseylkilponen@gmail.com",
  "meganmubaraki@gmail.com",
  "Corey.p.buckley@gmail.com",
  "carenmtorres@gmail.com",
];

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function existingMailingList() {
  const seen = new Set();
  const rows = [];
  EXISTING_MAILING_LIST.forEach((email) => {
    const normalized = normalizeEmail(email);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    rows.push({
      name: "Existing list",
      email: normalized,
      created: 0,
      type: "mailing_list",
      source: "kiki_sheet",
    });
  });
  return rows;
}

function mergeMailingLists(...lists) {
  const byEmail = new Map();
  lists.forEach((list) => {
    (list || []).forEach((row) => {
      const email = normalizeEmail(row && row.email);
      if (!email) return;
      const current = byEmail.get(email);
      if (!current || (row.created && !current.created)) {
        byEmail.set(email, { ...row, email });
      }
    });
  });
  return Array.from(byEmail.values()).sort((a, b) => String(a.email).localeCompare(String(b.email)));
}

module.exports = {
  EXISTING_MAILING_LIST,
  existingMailingList,
  mergeMailingLists,
  normalizeEmail,
};
