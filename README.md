# 🎀 Daily DSA Show-Up Streak Tracker

A Hello Kitty themed tracker to celebrate a friend showing up daily to practice DSA.
Every day she shows up (15 min or 1 hr+) = 1 Kinder Joy 🍫. A full 7-day streak = surprise gift 🎁.

Data lives in **your Google Sheet** (single source of truth). The page is hosted free on **GitHub Pages**.

---

## Part A — Connect the Google Sheet (10 min, one time)

1. Create a new Google Sheet. In **row 1**, type these headers exactly:
   | date | minutes | note | loggedAt |
   |------|---------|------|----------|

2. In the Sheet: **Extensions ▸ Apps Script**. Delete the sample code.
3. Open `apps-script.gs` from this folder, copy **everything**, paste it in, hit **Save** 💾.
4. Click **Deploy ▸ New deployment**.
   - Gear icon ▸ choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - **Deploy** ▸ authorize (pick your account ▸ Advanced ▸ Go to project ▸ Allow).
5. Copy the **Web app URL** (ends in `/exec`).

## Part B — Point the page at your Sheet

Open `index.html`, find the `CONFIG` block near the bottom, and edit:

```js
const CONFIG = {
  FRIEND_NAME: "Priya",              // her name
  WEEK_START:  "2026-07-13",         // the Monday the quest starts (YYYY-MM-DD)
  SHEET_API_URL: "https://script.google.com/.../exec",  // paste from Part A step 5
  SECRET: ""                          // leave "" unless you set one in the script
};
```

Save. Double-click `index.html` to test it locally first — mark today, then check the Sheet: a row should appear.

## Part C — Publish on GitHub Pages (shareable link)

1. Make a free GitHub account, create a **new public repo** (e.g. `dsa-streak`).
2. Upload `index.html` (you only need that one file live — the `.gs` and README stay for you).
3. Repo ▸ **Settings ▸ Pages**. Under *Build and deployment ▸ Branch*, pick `main` / `root`, **Save**.
4. Wait ~1 min. Your link appears: `https://<your-username>.github.io/dsa-streak/`
5. Send that link to your friend. She just opens it and taps **"I showed up today!"** 🎀

> Tip: On her phone she can "Add to Home Screen" so it feels like an app.

---

## How it works for her
- Taps **✅ I showed up today** → picks 15 min / 30 min / 1 hr+ → optional note (what she solved) → **Save**.
- The day lights up with a 🎀 bow, a Kinder Joy fills in, and the streak counter climbs.
- 7/7 triggers the "SURPRISE GIFT UNLOCKED" celebration.

## Ideas to make it even sweeter (optional)
- **Daily nudge:** in Apps Script add a time-based trigger that emails/WhatsApps her a "did you show up today?" reminder each evening.
- **Weekly recap:** a second script that on Sunday night emails you her total minutes + streak so you know whether to hand over the gift.
- **Multi-week:** bump `WEEK_START` each Monday to start a fresh quest; old rows stay in the Sheet as history.
- **Leaderboard-of-two:** add yourself as a column and race her — shared accountability works wonders.
- **Auto Kinder reminder:** the note field doubles as her log of solved problems, so by month-end she has a revision list.
