# CapturePoint — Corecrete LLC walkthrough

A personalised demo of the CapturePoint app, set up as if it were already running
**Corecrete LLC** (Rogelio Alvarado, concrete and paving, Atlanta GA).

Built to screen-share in the meeting. It shows Rogelio the system as *his* business
rather than as a generic product tour.

## What's in it

| Screen | What it shows |
|---|---|
| **Today** | Calls answered, jobs on the board, quoted today, money waiting. A week of call volume answered vs missed, where the money sits, and who is on site. |
| **Calls** | Every call written up — who rang, what they wanted, how long it lasted, whether it became a job. Missed calls show the text-back that went out. |
| **Jobs** | Each job on a six-step pipeline: New → Quoted → Scheduled → In progress → Done → Paid. **Tap any step to move the job** — it updates live, which demos well. |
| **Money** | Quotes out with their follow-up dates, invoices by state, and the review requests that go out as jobs finish. |
| **Crew** | Who is where today, plus the crew's own updates through the day. |
| **People** | Customer list, searchable by name, phone or street. |

## Important: this is demo data

Every call, job, customer, crew member and figure is **invented sample data**, written to
look like a plausible week at a small Atlanta concrete contractor. Nothing here is a real
customer, a real job, or a real result, and an orange banner on the first screen says so.

Rogelio's own mobile number is **not** in this repository. The header shows a placeholder
business line.

## Running it

It's a static site with no build step and no dependencies.

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Deploying to Vercel

Import the repo in Vercel and deploy. No framework, no build command, no output directory —
`vercel.json` already sets it as a static site.

## Files

```
index.html    screens and layout
styles.css    dark charcoal + amber theme, mobile first
app.js        rendering and interaction (plain JS)
data.js       all demo data — edit this to change what the demo shows
```

To tailor the demo further, edit `data.js` only. Job types, values, customer names, call
summaries and crew are all there, and nothing else needs touching.
