# Pediatric dosage for dummies

A bilingual (FR/EN) weight-based pediatric dosing app. **Study tool only** — every dose
must be verified against RxVigilance, the Guide des medicaments, or a pharmacist before
it goes anywhere near a patient.

Covers 11 diagnoses, 22 medications and 37 dosing regimens. Drug concentrations are the
products actually stocked in Quebec pharmacies.

## Look at it on your own computer

Open Terminal, then:

    cd ~/Desktop/posologie-pediatrique
    python3 -m http.server 8000

Then go to http://localhost:8000 in your browser. Press Control-C in Terminal to stop it.

(Opening `index.html` by double-clicking mostly works too, but the offline feature needs
a real server, which is what the command above gives you.)

## What is in each file

    index.html              the page structure
    css/style.css           all the styling
    js/data.js              the medications, doses, warnings and both languages
    js/app.js               the calculations and everything that reacts to a click
    manifest.webmanifest    the name and icon used when the app is installed
    sw.js                   the service worker, which makes it work with no connection
    icons/                  app icons

To change a dose or add a medication, `js/data.js` is the only file you need.

## Put it on the web

Any static host works, because there is no server code. GitHub Pages, Netlify (drag the
folder onto netlify.app/drop) or Cloudflare Pages will all serve it as-is.

If you change a file after publishing, bump `CACHE` in `sw.js` (`posologie-v1` to
`posologie-v2`), otherwise returning visitors keep seeing the old version.
