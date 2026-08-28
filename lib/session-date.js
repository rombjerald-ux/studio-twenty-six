function todayInOakland() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function isPastDate(iso) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(iso || "")) && String(iso) < todayInOakland();
}

module.exports = { todayInOakland, isPastDate };
