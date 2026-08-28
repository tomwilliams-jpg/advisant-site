// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE TO CHANGE FACTS ACROSS THE WHOLE SITE.
//  Everything here flows into page copy, footers, and schema.
//  Items marked TODO must be filled before launch.
// ─────────────────────────────────────────────────────────────

export const site = {
  domain: "https://www.advisantfinancial.com",
  // Logo files live in /public. logo.png is the full-colour mark for light
  // backgrounds; logo-light.png is the knockout version for the dark footer.
  // Both were cut from your supplied artwork with the white background removed.
  // If you have the original vector, drop in logo.svg and point these at it.
  logo: "/logo.png",        // full colour — light backgrounds
  logoLight: "/logo-white.png", // all-white knockout — dark backgrounds
  // /logo-dark.png (blue mark + white wordmark) is also included if you prefer it.
  // GBP lists the business as "Advisant Financial" (no LLC). Schema name must
  // match the listing exactly, so gbpName is what feeds structured data.
  gbpName: "Advisant Financial",
  legalName: "Advisant Financial, LLC",
  shortName: "Advisant Financial",
  portalUrl: "https://advisantfinancial.taxdome.com",
  // No public email by design — inquiries route through the TaxDome application.
  // NOTE: the current /app/signup path is served by TaxDome on your domain and
  // WILL BREAK at DNS cutover. This is the taxdome.com-hosted equivalent.
  applyUrl: "https://advisantfinancial.taxdome.com/app/signup",
  founded: "TODO_YEAR",
  // The current Contact page states: no walk-ins, no unscheduled calls.
  // Kept below so the site and the Google listings tell the same story.
  appointmentsOnly: true,
};

// ── Michigan ────────────────────────────────────────────────
// Address is HIDDEN on the Google listing, so no street address
// appears anywhere on the site. City + state only. Do not add one.
export const michigan = {
  slug: "rochester-hills-tax-services",
  city: "Rochester Hills",
  region: "MI",
  regionName: "Michigan",
  metro: "Metro Detroit",
  phone: "(720) 515-0557", // same line as Denver, per firm
  hours: "Mon–Fri 8:00am–5:00pm ET", // must match the Google listing exactly
  serviceArea: [
    "Rochester Hills", "Rochester", "Troy", "Birmingham",
    "Bloomfield Hills", "Auburn Hills", "Sterling Heights",
    "Shelby Township", "Royal Oak", "Bloomfield Township",
  ],
};

// ── Colorado ────────────────────────────────────────────────
// This address IS displayed on the Google listing, so it appears
// on the site. It must match the listing character for character.
export const colorado = {
  slug: "denver-tax-services",
  city: "Denver",
  region: "CO",
  regionName: "Colorado",
  metro: "Denver Metro",
  building: "Union Square Building",
  street: "1610 Wynkoop St",
  suite: "#550",
  postal: "80202",
  phone: "(720) 515-0557",
  hours: "Mon–Fri 8:00am–5:00pm MT, Sat 9:00am–12:00pm", // matches the Denver listing
  mapEmbed: "TODO_GOOGLE_MAPS_EMBED_URL",
  serviceArea: [
    "Denver", "Lakewood", "Aurora", "Englewood", "Littleton",
    "Greenwood Village", "Cherry Creek", "Wheat Ridge", "Golden",
  ],
};

export const team = [
  {
    name: "Thomas R. Williams, EA",
    title: "Managing Partner · Co-founder",
    // Drop a square headshot in /public and set this, e.g. "/tom.jpg".
    // Leave null to render a monogram instead.
    photo: null,
    school: "Michigan State University, B.A. Accounting",
    bio: "Tom's practice centers on strategic tax planning, IRS representation, and employer equity planning — the work that happens before a return is filed rather than after. He is an enrolled agent licensed by the Internal Revenue Service. Earlier in his career he volunteered through the IRS-certified VITA program, preparing returns for taxpayers who could not otherwise afford representation.",
  },
  {
    name: "Timothy V. Whalen, EA",
    title: "Managing Partner · Co-founder",
    photo: null,
    school: "Northern Illinois University, B.S. Business Administration (Finance)",
    bio: "Tim's practice covers tax preparation, IRS audit representation, payroll tax, and sales tax. He is an enrolled agent licensed by the Internal Revenue Service. Before Advisant he advised small businesses in Chicago on preparation and planning, and spent several years at BMO Capital Markets facilitating corporate, municipal, and Treasury bond trades.",
  },
];

// Three advisory pillars — the work the firm actually leads with.
export const pillars = [
  {
    slug: "equity",
    title: "Employer equity planning",
    lede: "ISOs, NSOs, RSUs, and founder stock, handled before the exercise rather than after the notice.",
    points: [
      "Exercise timing modelled against the alternative minimum tax, not guessed at",
      "83(b) elections filed inside the 30-day window, with the mailing evidence retained",
      "Qualified small business stock: tracking the five-year hold and the gross-asset test from the start",
      "Disqualifying dispositions, ESPP ordinary-income splits, and the cost-basis errors brokers report",
      "Withholding shortfalls on RSU vests, which is where most equity holders get an unexpected bill",
    ],
  },
  {
    slug: "owners",
    title: "Tax strategy for business owners",
    lede: "Entity structure, owner compensation, and the exit — decided on a timeline that still leaves options open.",
    points: [
      "S corporation reasonable compensation set defensibly, with contemporaneous support",
      "Entity selection and conversion analysis, including when an LLC should stop electing S status",
      "Retirement plan design: solo 401(k), cash balance, and defined benefit plans sized to the owner's actual capacity",
      "Pass-through entity elections in Michigan and Colorado, modelled per owner rather than elected by default",
      "Accountable plans, augmented buy-sell coordination, and basis planning ahead of a sale",
      "Multi-state nexus and apportionment as remote staff are added",
    ],
  },
  {
    slug: "family-office",
    title: "Family office services",
    lede: "One team holding the whole picture: the operating company, the holding entities, the trusts, and the family.",
    points: [
      "Consolidated planning across operating entities, holding companies, and trusts",
      "Fiduciary income tax returns and grantor trust reporting",
      "Coordination with your attorney, investment advisor, and insurance counsel so advice does not conflict",
      "Charitable structures: donor advised funds, private foundations, and appreciated-asset gifting",
      "Gift and generation-skipping transfer planning, and the annual reporting that follows",
      "Cash-flow and estimated-payment management across multiple entities and states",
    ],
  },
];

// Compliance and representation — grouped, because the grouping is real:
// what recurs annually, what happens once, and what happens when the IRS writes.
export const serviceGroups = [
  {
    group: "Filed every year",
    items: [
      {
        title: "Business tax preparation",
        body: "Partnerships, S corporations, C corporations, and single-member LLCs. Basis tracking, reasonable compensation, and K-1 reporting handled in-house.",
      },
      {
        title: "Individual tax preparation",
        body: "Federal, state, and local returns for owners, executives with equity, investors, and households filing across more than one state.",
      },
      {
        title: "Payroll and employer compliance",
        body: "Withholding registration, quarterly returns, local head taxes, and multi-state obligations as remote staff are added.",
      },
    ],
  },
  {
    group: "Filed when it applies",
    items: [
      {
        title: "Trust and estate returns",
        body: "Fiduciary income tax returns, grantor trust reporting, and coordination with your attorney on distributions and final returns.",
      },
      {
        title: "Gift and transfer reporting",
        body: "Form 709 filings, generation-skipping allocations, and the valuation support that has to exist before the return does.",
      },
      {
        title: "Entity elections and formations",
        body: "S elections, entity classification, late-election relief, and the state registrations that follow a new entity or a new state.",
      },
    ],
  },
  {
    group: "When the IRS writes",
    items: [
      {
        title: "Examination and appeals",
        body: "Full representation before the IRS in all 50 states, on any return, including ones we did not prepare.",
      },
      {
        title: "Collections and resolution",
        body: "Instalment agreements, penalty abatement, and lien or levy matters, handled directly rather than referred out.",
      },
      {
        title: "State tax controversy",
        body: "Michigan and Colorado notices, residency challenges, and multi-state nexus disputes.",
      },
    ],
  },
];

export const services = serviceGroups.flatMap((g) => g.items);

// ── Regulatory disclosures ──────────────────────────────────
// Advisant's principal is a registered Investment Adviser Representative of
// Financial Gravity Family Office Services, LLC, an SEC RIA. Website content
// is therefore advertising under SEC Rule 206(4)-1 and must carry these.
// CONFIRM THE EXACT WORDING WITH FGFOS COMPLIANCE BEFORE PUBLISHING.
export const compliance = {
  rlaLine:
    "Investment advisory services are offered through Financial Gravity Family Office Services, LLC (\u201CFGFOS\u201D), an SEC Registered Investment Adviser. FGFOS does not provide tax or legal advice and is not a certified public accountant. Any decision to implement ideas described on this website should be made in consultation with professional financial, tax, and legal counsel.",
  jurisdictionLine:
    "This site is published for residents of the United States only. Investment Adviser Representatives of FGFOS may only conduct business with residents of the states and jurisdictions in which they are properly registered. Not all products and services referenced are available in every state or through every representative.",
  taxSeparationLine:
    "Tax preparation, tax planning, and IRS representation services are provided by Advisant Financial, LLC, which is not a registered investment adviser. These services are separate and distinct from investment advisory services offered through FGFOS.",
  advUrl: "https://financialgravityfamilyofficeservices.com/Files/FGFOS%20ADV2A%20.pdf",
  crsUrl:
    "https://financialgravityfamilyofficeservices.com/fgmfo/wp-content/uploads/2021/09/FGFOS-Form-CRS-08-03-2021-2.pdf",
  compliancePhone: "800-588-3893",
  // Rule 206(4)-1 requires these facts clear and prominent ALONGSIDE any testimonial.
  testimonialDisclosure:
    "The statements below are from clients of Advisant Financial, LLC and describe tax preparation, tax planning, and representation services. They do not describe investment advisory services and are not representative of any client\u2019s experience with investment advisory services. No cash or non-cash compensation was provided for any statement. Statements are not necessarily representative of the experience of other clients and are not a guarantee of future results. A conflict of interest exists to the extent that a favourable statement may reflect positively on the firm and its principals.",
};

// ── Client reviews ──────────────────────────────────────────
// Verbatim from the firm's Google Business Profile. Add the reviewer's
// first name + last initial to each once you've matched them up.
export const reviews = [
  {
    name: "",
    quote: "My wife and I have been clients of Tom for a few years now and every tax season it's an incredible experience. His thoroughness, knowledge, and expert advice make filing a breeze. Especially for some of our unique scenarios (equity, employee stock purchase plans, company acquisitions, etc.) Tom has skillfully navigated all the details and has been available for questions when needed. Highly highly recommended.",
  },
  {
    name: "",
    quote: "Tom has been an outstanding tax advisor for our family for the past 3 years. Our tax situation is constantly changing and he's been very helpful teaching us how to navigate. With the ever changing tax laws and our increasingly complicated filings we are so happy to work with Advisant. We highly recommend Tom to help you!",
  },
  {
    name: "",
    quote: "I've been a client of Tom's now for a year, and I can honestly say I'd be lost without him. His thorough, patient, and incredibly detailed approach to helping my LLC stay financially organized is absolutely invaluable to its success. As the business grows, things become more complicated but he always has a simple, clean solution to keep it on track.",
  },
];


// Link to the live profile — required attribution when quoting Google reviews.
export const reviewSource = {
  label: "Read all reviews on Google",
  url: "https://maps.app.goo.gl/", // TODO: paste the short share link from your listing
  count: 28,
  rating: "5.0",
};

// ── FAQs ────────────────────────────────────────────────────
export const faqs = [
  {
    q: "What is an enrolled agent, and how is that different from a CPA?",
    a: "An enrolled agent is licensed by the U.S. Department of the Treasury rather than by a state board. EAs earn the credential by passing a three-part IRS examination covering individual tax, business tax, and representation. The practical difference is scope: enrolled agents hold unlimited practice rights before the IRS in all 50 states, on any return, whether or not we prepared it. A CPA licence is issued by one state and covers audit and attest work we do not perform.",
  },
  {
    q: "Do you work with clients outside Michigan and Colorado?",
    a: "Yes. We have offices in Metro Detroit and Denver, and we prepare returns and represent clients nationwide. Most of our work is done remotely through a secure portal with e-signature, so location rarely determines fit. Complexity does.",
  },
  {
    q: "What does an engagement cost?",
    a: "Advisory engagements are quoted after we review your two most recent returns and understand the structure, because the work varies enormously between a single-member LLC and a family with four entities and a trust. We do not run an hourly meter during the year; fees are agreed up front so you can call us without watching the clock. The new client application gathers what we need to quote.",
  },
  {
    q: "When should I start working with a tax advisor rather than a preparer?",
    a: "When decisions start driving your tax bill more than deductions do. Equity you have not exercised, an entity that may be the wrong one, a sale in view within a few years, income in more than one state, or a trust that owns part of the business — those are all decided before a return is prepared and cannot be fixed afterward.",
  },
  {
    q: "Do you handle IRS notices and audits?",
    a: "Yes, including on returns prepared by someone else. Enrolled agent status carries unlimited practice rights before the IRS, so we can represent you in examinations, appeals, and collections without referring the matter out.",
  },
  {
    q: "Can I meet in person?",
    a: "In Denver, yes, by appointment at our Wynkoop Street office. In Michigan we meet by appointment as well. We do not take walk-ins or unscheduled calls, which keeps our attention on scheduled client work rather than interruptions.",
  },
];
