This is a local mock database folder for the static Chakra site setup.

Important:
- Static HTML opened locally in a browser cannot write directly to files on disk.
- So this folder stores editable seed data in db.js.
- New submissions from forms are saved in browser localStorage at runtime.
- The admin portal reads both:
  1. seed data from database/db.js
  2. locally submitted data from localStorage

Edit these files locally:
- database/db.js -> seed users, bookings, payments, franchise leads, queries, admins, reports
- assets/js/site-data.js -> UPI, mobile number, WhatsApp, Instagram, app links
- assets/js/config.js -> plans and studio labels
