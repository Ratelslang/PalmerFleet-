# Fleet Management — Palmer Fleet

A standalone, installable PWA (Progressive Web App) for managing your vehicle fleet: register, service scheduler, license/insurance reminders, service & incident log, and renewal contacts. All data is stored locally on the device (browser `localStorage`) — nothing is sent to a server.

## Features

- **Dashboard** — live stats + an alerts feed for anything needing attention (service, license, insurance, scheduled work)
- **Vehicles** — full register, search by REG, auto-calculated next-service due date/km, license & insurance expiry tracking
- **Scheduler** — book a vehicle in for service; marking it complete auto-updates the vehicle record and logs it
- **Service & Incident Log** — every service, repair, incident, or fine, per vehicle, with cost tracking
- **Contacts** — your own list of renewal/service contacts (license disc renewals, insurer, workshops) — nothing pre-filled
- **Reminders** — in-app alerts plus optional browser push notifications as a license, insurance, or service date approaches
- **Export** — CSV export, direct PDF export (register, single vehicle, or the full service log), and browser print
- **Offline-first PWA** — installable to your home screen, works offline once cached

## Publishing to GitHub Pages

1. **Create a new GitHub repository** (e.g. `palmer-fleet`), public or private (Pages works on both if you have GitHub Pro/Team for private, otherwise use public).

2. **Upload these files to the repository root** (or to a `/docs` folder if you prefer — just make sure the setting in step 4 matches):
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `logo-header.png`
   - `vendor/jspdf.umd.min.js`
   - `vendor/jspdf.plugin.autotable.min.js`

   Easiest way — from this folder:
   ```bash
   git init
   git add .
   git commit -m "Fleet Management PWA"
   git branch -M main
   git remote add origin https://github.com/<your-username>/palmer-fleet.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**: In the repo, go to **Settings → Pages**. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)` (or `/docs` if that's where you put the files). Save.

4. **Wait a minute**, then your app will be live at:
   ```
   https://<your-username>.github.io/palmer-fleet/
   ```

5. **Install it**: open that URL on your phone or laptop in Chrome/Edge/Safari. You'll see an "Install" prompt (or use the browser's "Add to Home Screen" / "Install App" option in the address bar/menu). Once installed it runs full-screen, works offline, and keeps its own local data.

## Updating the app later

Any time you change `index.html`, `manifest.json`, or the vendor files:
1. Bump `CACHE_VERSION` in `sw.js` (e.g. `palmer-fleet-v3`) — otherwise installed devices keep serving the old cached version.
2. Commit and push to `main`. GitHub Pages redeploys automatically within a minute or two.
3. Devices with the app already installed will pick up the update the next time they're online and reopen the app.

## Notes

- **Browser notifications**: tap the bell icon in the app and choose "Enable Browser Notifications" to get alerted as a license disc, insurance, or scheduled service gets close to due. This only works once the app is served over `https://` (GitHub Pages is `https://` by default) — it will not work opened directly from a local file.
- **Data is per-device**: since everything is stored in the browser's local storage, the register on your phone and the register on your laptop are separate. There's no built-in sync between devices. If you need that, say the word and it can be added (e.g. an export/import backup flow, or wiring it into the existing SICE Portal Hub's shared storage).
- **PDF export** works fully offline once the app has loaded at least once, since the PDF library is bundled locally rather than loaded from a CDN.
