/* Corecrete LLC — demo data for the CapturePoint walkthrough.
   Everything here is invented sample data for a product demo.
   No real customer, job, or payment is represented. */

const BUSINESS = {
  name: "Corecrete LLC",
  owner: "Rogelio Alvarado",
  ownerTitle: "Founder",
  trade: "Concrete & paving",
  city: "Atlanta, GA",
  // Demo line only. Rogelio's real number is not stored in this repo.
  line: "(404) 555-0142",
  hours: "Mon–Sat, 7:00 – 6:00",
};

const CALLS = [
  { id:"c1", at:"Today 8:12 AM", name:"Denise Whitfield", phone:"(404) 555-0118", street:"1142 Oakdale Rd NE", status:"answered", secs:184,
    summary:"Wants a driveway replaced, two cars wide. Asked about stamped edging. Booked an estimate for Thursday 9am.", job:"j1" },
  { id:"c2", at:"Today 8:47 AM", name:"Unknown caller", phone:"(678) 555-0193", street:"", status:"missed", secs:0,
    summary:"Missed while you were pouring. The system texted back within 40 seconds and offered three estimate slots.", job:null, textedBack:true },
  { id:"c3", at:"Today 9:31 AM", name:"Marcus Hollins", phone:"(770) 555-0164", street:"88 Pinecrest Dr", status:"answered", secs:96,
    summary:"Patio slab, roughly 14x16. Wants a price before the holiday. Quote sent same morning.", job:"j2" },
  { id:"c4", at:"Today 10:05 AM", name:"Atlanta Ridge Builders", phone:"(404) 555-0177", street:"", status:"answered", secs:311,
    summary:"GC asking for flatwork pricing on three lots. Wants a bid by Friday.", job:"j3" },
  { id:"c5", at:"Yesterday 2:14 PM", name:"Priya Raman", phone:"(470) 555-0135", street:"506 Vine St SE", status:"answered", secs:142,
    summary:"Cracked walkway, wants repair not replacement. Estimate booked.", job:"j4" },
  { id:"c6", at:"Yesterday 3:48 PM", name:"Unknown caller", phone:"(404) 555-0151", street:"", status:"missed", secs:0,
    summary:"Called after hours. Auto-reply sent, no answer yet.", job:null, textedBack:true },
  { id:"c7", at:"Yesterday 4:22 PM", name:"Tom Beckett", phone:"(678) 555-0146", street:"3301 Clairmont Ave", status:"answered", secs:205,
    summary:"Garage floor coating question. Out of scope — referred out, logged so it does not come back as a lead.", job:null },
];

const STEPS = ["New", "Quoted", "Scheduled", "In progress", "Done", "Paid"];

const JOBS = [
  { id:"j1", customer:"Denise Whitfield", street:"1142 Oakdale Rd NE", type:"Driveway replacement",
    size:"620 sq ft", value:7400, step:1, crew:"Luis + Danny", when:"Estimate Thu 9:00 AM",
    note:"Two cars wide, stamped border. Tear-out of old slab included." },
  { id:"j2", customer:"Marcus Hollins", street:"88 Pinecrest Dr", type:"Patio slab",
    size:"14 x 16 ft", value:3250, step:1, crew:"Unassigned", when:"Quote sent today",
    note:"Broom finish. Wants it before the holiday." },
  { id:"j3", customer:"Atlanta Ridge Builders", street:"Lots 4, 7, 9 — Westside", type:"Commercial flatwork",
    size:"3 lots", value:28500, step:0, crew:"Unassigned", when:"Bid due Friday",
    note:"GC work. Needs a per-square-foot number and a schedule." },
  { id:"j4", customer:"Priya Raman", street:"506 Vine St SE", type:"Walkway repair",
    size:"90 sq ft", value:1150, step:2, crew:"Luis", when:"Mon 7:30 AM",
    note:"Repair, not replace. Customer asked for a tidy site." },
  { id:"j5", customer:"Angela Ruiz", street:"77 Hartwell Ct", type:"Stamped patio",
    size:"18 x 20 ft", value:9800, step:3, crew:"Luis + Danny + Marco", when:"Pouring today",
    note:"Ashlar slate pattern, charcoal release." },
  { id:"j6", customer:"Kevin Osei", street:"214 Maple Row", type:"Driveway apron",
    size:"180 sq ft", value:2100, step:4, crew:"Danny", when:"Finished Tuesday",
    note:"Cured and stripped. Photos uploaded." },
  { id:"j7", customer:"Wendell Pierce", street:"9 Longleaf Way", type:"Foundation slab",
    size:"1,100 sq ft", value:16400, step:5, crew:"Full crew", when:"Paid 29 Oct",
    note:"Paid in full by card, two days after the invoice went out." },
];

const INVOICES = [
  { id:"i1", customer:"Wendell Pierce", job:"Foundation slab", amount:16400, status:"paid", due:"Paid 29 Oct" },
  { id:"i2", customer:"Kevin Osei", job:"Driveway apron", amount:2100, status:"due", due:"Due in 4 days" },
  { id:"i3", customer:"Angela Ruiz", job:"Stamped patio", amount:4900, status:"deposit", due:"Deposit paid · balance on completion" },
  { id:"i4", customer:"Priya Raman", job:"Walkway repair", amount:1150, status:"draft", due:"Not sent yet" },
];

const QUOTES = [
  { id:"q1", customer:"Marcus Hollins", job:"Patio slab", amount:3250, sent:"Today 9:52 AM", chase:"Follow-up goes out Thursday if no reply" },
  { id:"q2", customer:"Denise Whitfield", job:"Driveway replacement", amount:7400, sent:"Draft — after Thursday's estimate", chase:"—" },
  { id:"q3", customer:"Atlanta Ridge Builders", job:"Commercial flatwork", amount:28500, sent:"Not sent — bid due Friday", chase:"—" },
];

const CREW = [
  { name:"Luis Mendoza", role:"Lead finisher", today:"77 Hartwell Ct — stamped patio", status:"on site" },
  { name:"Danny Carter", role:"Finisher", today:"77 Hartwell Ct — stamped patio", status:"on site" },
  { name:"Marco Silva", role:"Labourer", today:"77 Hartwell Ct — stamped patio", status:"on site" },
  { name:"Rogelio Alvarado", role:"Founder", today:"Estimates + Westside bid", status:"running the day" },
];

const CREW_FEED = [
  { who:"Luis", at:"11:40 AM", text:"Hartwell patio poured. Starting the stamp in 20 minutes." },
  { who:"Danny", at:"10:05 AM", text:"Short two bags of release. Picking up on the way back." },
  { who:"System", at:"8:47 AM", text:"Missed call from (678) 555-0193 — text-back sent with three estimate slots." },
  { who:"Luis", at:"7:15 AM", text:"Crew on site, forms checked, pour on schedule." },
];

const CUSTOMERS = [
  { name:"Denise Whitfield", phone:"(404) 555-0118", street:"1142 Oakdale Rd NE", jobs:1, spent:0, since:"New this week" },
  { name:"Marcus Hollins", phone:"(770) 555-0164", street:"88 Pinecrest Dr", jobs:1, spent:0, since:"New this week" },
  { name:"Atlanta Ridge Builders", phone:"(404) 555-0177", street:"Westside lots", jobs:1, spent:0, since:"New this week" },
  { name:"Priya Raman", phone:"(470) 555-0135", street:"506 Vine St SE", jobs:1, spent:0, since:"New this week" },
  { name:"Angela Ruiz", phone:"(678) 555-0122", street:"77 Hartwell Ct", jobs:1, spent:4900, since:"Customer since Oct" },
  { name:"Kevin Osei", phone:"(404) 555-0109", street:"214 Maple Row", jobs:1, spent:2100, since:"Customer since Oct" },
  { name:"Wendell Pierce", phone:"(770) 555-0188", street:"9 Longleaf Way", jobs:2, spent:16400, since:"Customer since Sep" },
];

const CALL_WEEK = [
  { day:"Mon", answered:9,  missed:1 },
  { day:"Tue", answered:12, missed:0 },
  { day:"Wed", answered:7,  missed:2 },
  { day:"Thu", answered:14, missed:1 },
  { day:"Fri", answered:11, missed:1 },
  { day:"Sat", answered:5,  missed:0 },
  { day:"Sun", answered:2,  missed:0 },
];

const REVIEWS = [
  { customer:"Wendell Pierce", state:"sent", at:"Review request sent 30 Oct" },
  { customer:"Kevin Osei", state:"queued", at:"Goes out when the invoice clears" },
  { customer:"Angela Ruiz", state:"queued", at:"Goes out when the patio is signed off" },
];
