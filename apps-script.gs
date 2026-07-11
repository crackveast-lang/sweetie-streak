/**
 * DSA Streak Tracker — Google Sheet backend
 * ------------------------------------------
 * This turns your Google Sheet into a tiny API the tracker page talks to.
 *
 * SETUP (one time):
 *  1. Make a Google Sheet. In row 1 put these headers exactly:
 *        A1: date   B1: minutes   C1: note   D1: loggedAt
 *  2. Extensions ▸ Apps Script. Delete any code, paste ALL of this in.
 *  3. (Optional) set a SECRET below and put the same word in the page's CONFIG.
 *  4. Deploy ▸ New deployment ▸ type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *     Click Deploy, authorize, copy the /exec URL.
 *  5. Paste that URL into SHEET_API_URL in index.html.
 */

// Optional shared secret. Leave "" to allow anyone with the link to write.
const SECRET = "";

// Reads all rows -> returns JSON the page uses to draw the week.
function doGet(e) {
  const rows = getSheet().getDataRange().getValues();
  const out = [];
  for (let i = 1; i < rows.length; i++) {         // skip header
    if (!rows[i][0]) continue;
    out.push({
      date: formatDate(rows[i][0]),
      minutes: rows[i][1],
      note: rows[i][2]
    });
  }
  return json(out);
}

// Adds or updates one day's entry.
function doPost(e) {
  let data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) {}

  if (SECRET && data.secret !== SECRET) {
    return json({ ok: false, error: "bad secret" });
  }
  if (!data.date) {
    return json({ ok: false, error: "missing date" });
  }

  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const stamp = new Date();
  const minutes = Number(data.minutes) || 15;
  const note = data.note || "";

  // update if the date already exists
  for (let i = 1; i < rows.length; i++) {
    if (formatDate(rows[i][0]) === data.date) {
      sheet.getRange(i + 1, 2).setValue(minutes);
      sheet.getRange(i + 1, 3).setValue(note);
      sheet.getRange(i + 1, 4).setValue(stamp);
      return json({ ok: true, updated: true });
    }
  }
  // else append a new row
  sheet.appendRow([data.date, minutes, note, stamp]);
  return json({ ok: true, added: true });
}

/* helpers */
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}
function formatDate(v) {
  if (v instanceof Date) {
    return v.getFullYear() + "-" +
      String(v.getMonth() + 1).padStart(2, "0") + "-" +
      String(v.getDate()).padStart(2, "0");
  }
  return String(v).trim();
}
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
